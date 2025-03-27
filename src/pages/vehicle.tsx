import { GetServerSideProps } from 'next';
import {
  Collapse,
  Grid2 as Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip
} from '@mui/material';
import {
  Props,
  SerializableImport,
  SerializableRegistration,
  getColumnName,
  valueToString,
  sections
} from '../util/vehicle';
import {
  getImportFromPcv,
  getVehicle,
  queryDecoder
} from '../util/vehicle/server';
import { useState } from 'react';
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

function ImportData({ country, import_date }: SerializableImport) {
  return (
    `Dovezeno z: ${country}` +
    (import_date
      ? `, dne ${new Date(import_date.value).toLocaleDateString()}`
      : '')
  );
}

const Section = ({
  label,
  keys,
  renderSubList
}: {
  label: string;
  keys: readonly (keyof SerializableRegistration)[];
  renderSubList: (key: keyof SerializableRegistration) => {
    name: string;
    description?: string | null;
    value: string;
  };
}) => {
  const [open, setOpen] = useState(true);
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
          timeout="auto"
          unmountOnExit
          sx={{
            width: '100%'
          }}
        >
          <Table>
            <TableBody>
              {keys.map((key) => {
                const { name, description, value } = renderSubList(key);
                return (
                  <TableRow sx={{ borderBottom: 'solid' }}>
                    <TableCell>
                      <AttributeCell name={name} description={description} />
                    </TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Collapse>
      </>
    </StatCard>
  );
};

export default function Page({ vehicle, vehicleImport }: Props) {
  return (
    <Grid
      container
      spacing={2}
      columns={12}
      sx={{ mb: (theme) => theme.spacing(2) }}
    >
      {sections.map((section) => {
        return (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <Section
              label={section.label}
              keys={section.options}
              renderSubList={(key) => ({
                ...getColumnName(key),
                value: valueToString(vehicle[key])
              })}
            />
          </Grid>
        );
      })}
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
  const vehicleImport = await getImportFromPcv(vehicle.pcv);
  return { props: { vehicle, vehicleImport } };
};
