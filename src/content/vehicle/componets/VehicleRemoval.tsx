import { includeValue, SerializableRemoval, valueToString } from '..';
import { toTypedEntries } from '../../data';
import removalColumnsMap from '../removalColumnsMap';
import DataPairsTable from './DataPairsTable';
import Section from './Section';

export default function VehicleRemoval({
  vehicleRemoval
}: {
  vehicleRemoval: SerializableRemoval;
}) {
  return (
    <Section label="Info o vyřazení z provozu" openKey="removals">
      <DataPairsTable
        data={toTypedEntries(vehicleRemoval).filter(([, value]) =>
          includeValue(value)
        )}
        renderRow={([key, value]) => ({
          ...removalColumnsMap[key],
          value: valueToString(value)
        })}
      />
    </Section>
  );
}
