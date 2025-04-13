import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { SerializableOwner, valueToString } from '..';
import Section from './Section';
import ownersColumnsMap from '../ownersColumnsMap';
import TextWithDescription from '../../../components/TextWithDescription';
import { toTypedEntries } from '../../data';

export default function VehicleOwners({
  vehicleOwners
}: {
  vehicleOwners: SerializableOwner[];
}) {
  return (
    <Section label={`Vlastníci a provozovatelé (${vehicleOwners.length})`}>
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
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicleOwners.map((inspection, index) => (
            <TableRow key={index}>
              {toTypedEntries(ownersColumnsMap).map(([key, mapping]) => {
                const value = inspection[key];
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Section>
  );
}
