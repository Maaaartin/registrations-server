import { GetServerSideProps } from 'next';
import {
  Collapse,
  Divider,
  Grid2 as Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
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
import VehicleTimeline from '../components/VehicleTimeline';
import TextWithDescription from '../components/TextWithDescription';
import removalColumnsMap from '../util/vehicle/removalColumnsMap';
import importsColumnMap from '../util/vehicle/importsColumnMap';
import { toTypedEntries } from '../util/data';

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
                <TextWithDescription name={name} description={description} />
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
        data={toTypedEntries(vehicleImport).filter(([, value]) =>
          includeValue(value)
        )}
        renderRow={([key, value]) => ({
          ...importsColumnMap[key],
          value: valueToString(value)
        })}
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
                <TextWithDescription
                  name={value.name}
                  description={value.description}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicleInspections.map((inspection, index) => (
            <TableRow key={index}>
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
        data={toTypedEntries(vehicleRemoval).filter(([, value]) =>
          includeValue(value)
        )}
        renderRow={([key, value]) => ({
          ...removalColumnsMap[key],
          value: valueToString(value)
        })}
      />
    </Section>
  );
}

export default function Page(props: Props) {
  const { vehicle, vehicleImport, vehicleInspections, vehicleRemoval } = props;
  const gridContent = sections
    .map((section) => ({
      ...section,
      options: section.options.filter((option) => includeValue(vehicle[option]))
    }))
    .filter((section) => Boolean(section.options.length))
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
            data={toTypedEntries(vehicle).filter(
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
      <Grid size={{ xs: 12 }}>
        <Section label="Časová osa">
          <VehicleTimeline {...props} />
        </Section>
      </Grid>

      {Boolean(vehicleInspections.length) && (
        <Grid size={{ xs: 12 }}>
          <VehicleInspections vehicleInspections={vehicleInspections} />
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
