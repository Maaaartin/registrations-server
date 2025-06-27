import { includeValue, SerializableImport, valueToString } from '..';
import { toTypedEntries } from '../../data';
import importsColumnMap from '../importsColumnMap';
import DataPairsTable from './DataPairsTable';
import Section from './Section';

export default function VehicleImport({
  vehicleImport
}: {
  vehicleImport: SerializableImport;
}) {
  return (
    <Section label="Info o dovozu" openKey="imports">
      <DataPairsTable
        data={toTypedEntries(vehicleImport).filter(([, value]) =>
          includeValue(value)
        )}
        renderRow={([key, value]) => ({
          ...importsColumnMap[key],
          value: valueToString(value)
        })}
      />
    </Section>
  );
}
