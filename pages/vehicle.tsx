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

function mapVehicle(
  vehicle: SerializableRegistration
): [string, string | Date][] {
  const excludeFields: (keyof registrations)[] = [
    'id',
    'max_vykon',
    'max_vykon_otacky',
    'kola_a_pneumatiky_naprava_1',
    'kola_a_pneumatiky_naprava_2',
    'kola_a_pneumatiky_naprava_3',
    'kola_a_pneumatiky_naprava_4',
  ];

  const filteredEntries = Object.fromEntries(
    Object.entries(vehicle).filter(([key]) => {
      return !excludeFields.includes(key as keyof registrations);
    })
  );
  (
    filteredEntries as Record<string, string>
  ).max_vykon = `${vehicle.max_vykon} / ${vehicle.max_vykon_otacky}`;
  (
    filteredEntries as Record<string, string>
  ).pocet_naprav = `${vehicle.pocet_naprav} / ${vehicle.naprav_pohanenych}`;
  (filteredEntries as Record<string, string>).kola_a_pneumatiky = [
    vehicle.kola_a_pneumatiky_naprava_1,
    vehicle.kola_a_pneumatiky_naprava_2,
    vehicle.kola_a_pneumatiky_naprava_3,
    vehicle.kola_a_pneumatiky_naprava_4,
  ].join('; ');
  return Object.entries(filteredEntries).map(([key, value]) => [
    key,
    typeof value === 'object' && value?.type === 'Date'
      ? new Date(value.value)
      : String(value),
  ]);
}

export default function Page({ vehicle }: Props) {
  if (!vehicle) return 'not found';
  const mapped = mapVehicle(vehicle);
  return (
    <>
      <h1>VIN {vehicle.vin}</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {mapped.map(([key, value]) => (
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
    </>
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
