import { GetServerSideProps } from 'next';
import { prisma } from '../prisma';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import {
  SerializableRegistration,
  serializeRegistration,
} from '../util/registrations';
import { registrations } from '@prisma/client';
import registrationColumnMap from '../registrationColumnMap.json';

type Props = { vehicle: SerializableRegistration | null };

export default function Page({ vehicle }: Props) {
  if (!vehicle) return 'not found';
  return (
    <div>
      <h1>VIN {vehicle.vin}</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {Object.entries(vehicle).map(([key, value]) => (
              <TableRow
                key={key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {(registrationColumnMap as Record<string, string>)[key] ||
                    key}
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
  query,
}) => {
  const vin = [query.vin].flat()[0];
  const id = parseInt([query.id].flat()[0] || '');
  let result: registrations | null = null;
  if (vin) {
    result = await prisma.registrations.findFirst({
      where: { vin },
    });
  }
  if (id) {
    result = await prisma.registrations.findFirst({
      where: { id },
    });
  }

  return { props: { vehicle: result ? serializeRegistration(result) : null } };
};
