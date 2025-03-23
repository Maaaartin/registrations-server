import { GetServerSideProps } from 'next';
import prisma from '../../prisma';
import { serialize } from '../util/registrations';

export default function Search({ imports }: any) {
  console.log(imports);
  return 'asdf';
}

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
  const data = await prisma.imports.findMany({
    where: { import_date: { not: null } },
    take: 10
  });
  const imports = data.map(serialize);
  return {
    props: {
      imports
    }
  };
};
