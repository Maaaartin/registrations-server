import { GetServerSideProps } from 'next';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Table,
  TableBody,
  TableCell,
  TableRow
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
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ReactNode, useState } from 'react';

// function AttributeCell({ row: { id, description } }: ReactNode) {
//   if (description) {
//     return (
//       <Tooltip title={description}>
//         <span>{id} *</span>
//       </Tooltip>
//     );
//   }
//   return id;
// }

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
    primary: ReactNode;
    secondary: ReactNode;
  };
}) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Table>
          <TableBody>
            {keys.map((key) => {
              const { primary, secondary } = renderSubList(key);
              return (
                <TableRow>
                  <TableCell>{primary}</TableCell>
                  <TableCell>{secondary}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Collapse>
    </>
  );
};

export default function Page({ vehicle, vehicleImport }: Props) {
  return (
    <>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Údaje o vozidle
          </ListSubheader>
        }
      >
        {sections.map((section) => {
          return (
            <Section
              label={section.label}
              keys={section.options}
              renderSubList={(key) => {
                return {
                  primary: getColumnName(key).name,
                  secondary: valueToString(vehicle[key])
                };
              }}
            />
          );
        })}
      </List>
    </>
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
