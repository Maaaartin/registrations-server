import { GetServerSideProps } from 'next';
import { prisma } from '../../prisma';
import { registrations } from '@prisma/client';

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
  const { vin } = vehicle;
  return (
    <div>
      <h1>Server Rendered Page</h1>
      {vin ? <p>ID: {vin}</p> : <p>No ID provided</p>}
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
