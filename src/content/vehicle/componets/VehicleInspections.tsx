import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { SerializableInspection, valueToString } from '..';
import Section from './Section';
import inspectionsColumnMap from '../inspectionsColumnMap';
import TextWithDescription from '../../../components/TextWithDescription';
import { toTypedEntries } from '../../data';

export default function VehicleInspections({
  vehicleInspections
}: {
  vehicleInspections: SerializableInspection[];
}) {
  return (
    <Section label="Technické prohlídky">
      <Table>
        <TableHead>
          <TableRow>
            {Object.values(inspectionsColumnMap).map((value) => (
              <TableCell key={value.name}>
                <TextWithDescription
                  name={value.name}
                  description={value.description}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicleInspections.map((inspection, index) => (
            <TableRow key={index}>
              {toTypedEntries(inspectionsColumnMap).map(([key]) => {
                const value = inspection[key];
                if (key === 'kod_stk' && value) {
                  return (
                    <TableCell key={key}>
                      <a
                        href={`https://stk.opendatalab.cz/stations/${value}`}
                        target="_blank"
                      >
                        {valueToString(value)}
                      </a>
                    </TableCell>
                  );
                }
                return <TableCell key={key}>{valueToString(value)}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Section>
  );
}
