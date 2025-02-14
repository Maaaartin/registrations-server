import { GetServerSideProps } from 'next';
import { prisma } from '../../prisma';
import { registrations } from '@prisma/client';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

type ConvertDatesToString<T> = {
  [K in keyof T]: T[K] extends Date | null ? string | null : T[K];
};

type SerializableRegistration = ConvertDatesToString<registrations>;

function serializeRegistration(
  vehicle: registrations
): SerializableRegistration {
  return Object.fromEntries(
    Object.entries(vehicle).map(([key, value]) => {
      return [key, value instanceof Date ? value.toISOString() : value];
    })
  ) as SerializableRegistration;
}

type Props = { vehicle: SerializableRegistration | null };

export default function Page({ vehicle }: Props) {
  if (!vehicle) return 'not found';
  return (
    <div>
      <h1>Server Rendered Page</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {Object.entries(vehicle).map(([key, value]) => (
              <TableRow
                key={key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {key}
                </TableCell>
                <TableCell component="th" scope="row">
                  {String(value)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const vin = params?.vin ? String(params.vin) : null;
  const result = await prisma.registrations.findFirst({
    where: { vin },
  });

  return { props: { vehicle: result ? serializeRegistration(result) : null } };
};
