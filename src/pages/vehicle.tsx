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
import { Props, getColumnName, valueToString, sections } from '../util/vehicle';
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

function Section<T>({
  label,
  keys,
  renderSubList
}: {
  label: string;
  keys: T[];
  renderSubList: (key: T) => {
    name: string;
    description?: string | null;
    value: string;
  };
}) {
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
}

export default function Page({ vehicle, vehicleImport }: Props) {
  const gridContent = sections.map((section) => {
    return (
      <Grid key={section.key} size={{ xs: 12 }}>
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
  });
  if (vehicleImport) {
    const vehicleImportComponent = (
      <Section
        label="Info o dovozu"
        keys={(
          Object.keys(vehicleImport) as (keyof typeof vehicleImport)[]
        ).filter((key) => !['id', 'pcv'].includes(key))}
        renderSubList={(key) => {
          switch (key) {
            case 'country':
              return { name: 'Země', value: vehicleImport[key] || '' };
            case 'import_date':
              return {
                name: 'Datum dovozu',
                value: valueToString(vehicleImport[key])
              };
            default:
              return { name: '', value: '', description: '' };
          }
        }}
      />
    );
    gridContent.unshift(vehicleImportComponent);
  }
  return (
    <Grid
      container
      spacing={2}
      columns={12}
      sx={{ mb: (theme) => theme.spacing(2) }}
    >
      {gridContent}
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
