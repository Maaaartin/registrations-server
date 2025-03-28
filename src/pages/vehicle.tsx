import { GetServerSideProps } from 'next';
import {
  Collapse,
  Divider,
  Grid2 as Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material';
import {
  Props,
  getColumnName,
  valueToString,
  sections,
  SerializableRegistration,
  SerializableImport,
  SerializableInspection,
  includeValue,
  shouldIncludeRegistrationField,
  SerializableRemoval
} from '../util/vehicle';
import {
  getImportFromPcv,
  getInspectionsFromPcv,
  getVehicle,
  getVehicleRemoval,
  queryDecoder
} from '../util/vehicle/server';
import { PropsWithChildren, useState } from 'react';
import StatCard from '../components/StatCard';
import inspectionsColumnMap from '../util/vehicle/inspectionsColumnMap';

function AttributeCell({
  name,
  description
}: {
  name: string;
  description: string | undefined | null;
}) {
  if (description) {
    return (
      <Tooltip title={description}>
        <span>{name} *</span>
      </Tooltip>
    );
  }
  return name;
}

function DataPairsTable<T>({
  data,
  renderRow
}: {
  data: T[];
  renderRow: (object: T) => {
    name: string;
    description?: string | null;
    value: string;
  };
}) {
  return (
    <Table>
      <TableBody>
        {data.map((object, index) => {
          const { name, description, value } = renderRow(object);
          return (
            <TableRow key={index}>
              <TableCell>
                <AttributeCell name={name} description={description} />
              </TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function Section({
  label,
  children
}: PropsWithChildren<{
  label: string;
}>) {
  const [open, setOpen] = useState(false);
  const onToggle = () => setOpen(!open);
  return (
    <StatCard
      title={label}
      collapse={{
        open,
        onToggle
      }}
    >
      <Collapse
        in={open}
        timeout={0}
        unmountOnExit
        sx={{
          width: '100%'
        }}
      >
        <Divider />
        {children}
      </Collapse>
    </StatCard>
  );
}

function VehicleImport({
  vehicleImport
}: {
  vehicleImport: SerializableImport;
}) {
  return (
    <Section label="Info o dovozu">
      <DataPairsTable
        data={(
          Object.entries(vehicleImport) as [
            keyof SerializableImport,
            SerializableImport[keyof SerializableImport]
          ][]
        ).filter(
          ([key, value]) => !['id', 'pcv'].includes(key) && includeValue(value)
        )}
        renderRow={([key, value]) => {
          switch (key) {
            case 'country':
              return { name: 'Země', value: vehicleImport[key] || '' };
            case 'import_date':
              return {
                name: 'Datum dovozu',
                value: valueToString(value)
              };
            default:
              return { name: '', value: '', description: '' };
          }
        }}
      />
    </Section>
  );
}

function VehicleInspections({
  vehicleInspections
}: {
  vehicleInspections: SerializableInspection[];
}) {
  return (
    <Section label="Technické prohlídky">
      <Table>
        <TableHead>
          <TableRow>
            {Object.values(inspectionsColumnMap).map((value) => (
              <TableCell key={value.name}>
                <AttributeCell
                  name={value.name}
                  description={value.description}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicleInspections.map((inspection) => (
            <TableRow key={inspection.id}>
              {(
                Object.keys(
                  inspectionsColumnMap
                ) as (keyof typeof inspectionsColumnMap)[]
              ).map((key) => (
                <TableCell key={key}>
                  {valueToString(inspection[key])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Section>
  );
}

function VehicleRemoval({
  vehicleRemoval
}: {
  vehicleRemoval: SerializableRemoval;
}) {
  return (
    <Section label="Info o vyřazení z provozu">
      <DataPairsTable
        data={(
          Object.entries(vehicleRemoval) as [
            keyof SerializableRemoval,
            SerializableRemoval[keyof SerializableRemoval]
          ][]
        ).filter(
          ([key, value]) => !['id', 'pcv'].includes(key) && includeValue(value)
        )}
        renderRow={([key, value]) => {
          switch (key) {
            case 'duvod':
              return { name: 'Důvod', value: valueToString(value) };

            case 'datum_od':
              return {
                name: 'Datum od',
                value: valueToString(value)
              };
            case 'datum_do':
              return {
                name: 'Datum do',
                value: valueToString(value)
              };
            case 'rm_kod':
              return {
                name: 'RM Kód',
                value: valueToString(value)
              };
            case 'rm_nazev':
              return {
                name: 'RM Název',
                value: valueToString(value)
              };
            default:
              return { name: '', value: '', description: '' };
          }
        }}
      />
    </Section>
  );
}

export default function Page({
  vehicle,
  vehicleImport,
  vehicleInspections,
  vehicleRemoval
}: Props) {
  const gridContent = sections
    .concat({
      label: 'Ostatní Údaje',
      key: 'ostatni_udaje',
      options: (
        Object.keys(vehicle) as (keyof SerializableRegistration)[]
      ).filter(
        (key) =>
          key !== 'id' && !sections.some((sec) => sec.options.includes(key))
      )
    })
    .map((section) => {
      return (
        <Section key={section.key} label={section.label}>
          <DataPairsTable
            data={(
              Object.entries(vehicle) as [
                keyof SerializableRegistration,
                SerializableRegistration[keyof SerializableRegistration]
              ][]
            ).filter(
              ([key, value]) =>
                section.options.includes(key) &&
                includeValue(value) &&
                shouldIncludeRegistrationField(key)
            )}
            renderRow={([key, value]) => {
              const { bindWith, ...rest } = getColumnName(key);
              return {
                ...rest,
                value:
                  valueToString(value) +
                  (bindWith ? `, ${valueToString(vehicle[bindWith])}` : '')
              };
            }}
          />
        </Section>
      );
    });
  if (vehicleImport) {
    gridContent.unshift(<VehicleImport vehicleImport={vehicleImport} />);
  }
  if (vehicleRemoval) {
    gridContent.unshift(<VehicleRemoval vehicleRemoval={vehicleRemoval} />);
  }

  return (
    <Grid
      container
      spacing={2}
      columns={12}
      sx={{ mb: (theme) => theme.spacing(2) }}
    >
      {Boolean(vehicleInspections.length) && (
        <Grid size={{ xs: 12 }}>
          <VehicleInspections vehicleInspections={vehicleInspections} />{' '}
        </Grid>
      )}
      {gridContent.map((Component, index) => (
        <Grid key={index} size={{ xs: 12, md: 6 }}>
          {Component}
        </Grid>
      ))}
    </Grid>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query
}) => {
  const { id } = queryDecoder.parse(query);
  if (!id) return { notFound: true };
  const vehicle = await getVehicle(id);
  if (!vehicle) return { notFound: true };
  const [vehicleImport, vehicleInspections, vehicleRemoval] = await Promise.all(
    [
      getImportFromPcv(vehicle.pcv),
      getInspectionsFromPcv(vehicle.pcv),
      getVehicleRemoval(vehicle.pcv)
    ]
  );
  return {
    props: { vehicle, vehicleImport, vehicleInspections, vehicleRemoval }
  };
};
