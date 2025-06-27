import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { z } from 'zod';
import { SerializableOwner, valueToString } from '..';
import Section from './Section';
import ownersColumnsMap from '../ownersColumnsMap';
import TextWithDescription from '../../../components/TextWithDescription';
import { toTypedEntries } from '../../data';
import useFetch from '../../../hooks/useFetch';
import Link from 'next/link';

function VehicleCount({ ico }: { ico: string }) {
  const searchParams = new URLSearchParams({ ico });
  const { data } = useFetch({
    url: `/api/vehicle-count?${new URLSearchParams({ ico })}`,
    decoder: z.number()
  });
  return <Link href={`/owners?${searchParams}`}>{data}</Link>;
}

export default function VehicleOwners({
  vehicleOwners
}: {
  vehicleOwners: SerializableOwner[];
}) {
  return (
    <Section
      label={`Vlastníci a provozovatelé (${vehicleOwners.length})`}
      openKey="owners"
    >
      <Table>
        <TableHead>
          <TableRow>
            {Object.values(ownersColumnsMap).map((value) => (
              <TableCell key={value.name}>
                <TextWithDescription
                  name={value.name}
                  description={
                    'description' in value ? value.description : null
                  }
                />
              </TableCell>
            ))}
            <TableCell>Počet vozidel</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicleOwners.map((owner, index) => (
            <TableRow key={index}>
              {toTypedEntries(ownersColumnsMap).map(([key, mapping]) => {
                const value = owner[key];
                if (key === 'ico' && value) {
                  return (
                    <TableCell key={key}>
                      <a
                        href={`https://www.databaze-osvc.cz/subjekt/${value}`}
                        target="_blank"
                      >
                        {valueToString(value)}
                      </a>
                    </TableCell>
                  );
                }
                return (
                  <TableCell key={key}>
                    {'map' in mapping
                      ? mapping.map(value as number)
                      : valueToString(value)}
                  </TableCell>
                );
              })}
              <TableCell>
                {owner.ico && <VehicleCount ico={owner.ico} />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Section>
  );
}
