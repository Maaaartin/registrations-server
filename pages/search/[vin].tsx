import { GetServerSideProps } from 'next';
import { prisma } from '../../prisma';
import { registrations } from '@prisma/client';

type Props = { vehicle: registrations | null };

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

  return { props: { vehicle: JSON.parse(JSON.stringify(result)) } };
};
