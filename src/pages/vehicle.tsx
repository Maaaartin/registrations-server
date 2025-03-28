import { GetServerSideProps } from 'next';
import {
  Collapse,
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
  inspectionHeaderMap
} from '../util/vehicle';
import {
  getImportFromPcv,
  getInspectionsFromPcv,
  getVehicle,
  queryDecoder
} from '../util/vehicle/server';
import { PropsWithChildren, useState } from 'react';
import StatCard from '../components/StatCard';

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
            <TableRow key={index} sx={{ borderBottom: 'solid' }}>
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
      <>
        <Collapse
          in={open}
          timeout={0}
          unmountOnExit
          sx={{
            width: '100%'
          }}
        >
          {children}
        </Collapse>
      </>
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
        ).filter(([key]) => !['id', 'pcv'].includes(key))}
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
            {Object.values(inspectionHeaderMap).map((value) => (
              <TableCell key={value}>{value}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicleInspections.map((inspection) => (
            <TableRow key={inspection.id}>
              {(
                Object.keys(
                  inspectionHeaderMap
                ) as (keyof typeof inspectionHeaderMap)[]
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

export default function Page({
  vehicle,
  vehicleImport,
  vehicleInspections
}: Props) {
  const gridContent = sections.map((section) => {
    return (
      <Section key={section.key} label={section.label}>
        <DataPairsTable
          data={(
            Object.entries(vehicle) as [
              keyof SerializableRegistration,
              SerializableRegistration[keyof SerializableRegistration]
            ][]
          ).filter(([key]) => section.options.includes(key))}
          renderRow={([key, value]) => ({
            ...getColumnName(key),
            value: valueToString(value)
          })}
        />
      </Section>
    );
  });
  if (vehicleImport) {
    gridContent.unshift(<VehicleImport vehicleImport={vehicleImport} />);
  }
  if (vehicleInspections.length) {
    gridContent.unshift(
      <VehicleInspections vehicleInspections={vehicleInspections} />
    );
  }
  return (
    <Grid
      container
      spacing={2}
      columns={12}
      sx={{ mb: (theme) => theme.spacing(2) }}
    >
      {gridContent.map((Component, index) => (
        <Grid key={index} size={{ xs: 12 }}>
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
  const [vehicleImport, vehicleInspections] = await Promise.all([
    getImportFromPcv(vehicle.pcv),
    getInspectionsFromPcv(vehicle.pcv)
  ]);
  return { props: { vehicle, vehicleImport, vehicleInspections } };
};
