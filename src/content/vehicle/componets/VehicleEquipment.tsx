import { includeValue, SerializableEquipment, valueToString } from '..';
import DataPairsTable from './DataPairsTable';
import Section from './Section';

export default function VehicleEquipment({
  vehicleEquipment
}: {
  vehicleEquipment: SerializableEquipment[];
}) {
  return (
    <Section label="Doplňková výbava" openKey="equipment">
      <DataPairsTable
        data={vehicleEquipment.filter(({ typ }) => includeValue(typ))}
        renderRow={({ typ }) => ({
          name: 'Typ',
          value: valueToString(typ)
        })}
      />
    </Section>
  );
}
