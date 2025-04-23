import { GetServerSideProps } from 'next';
import { Grid } from '@mui/material';
import {
  Props,
  getColumnName,
  valueToString,
  sections,
  SerializableRegistration,
  includeValue,
  shouldIncludeRegistrationField
} from '../content/vehicle';
import {
  getImportFromPcv,
  getInspectionsFromPcv,
  getVehicle,
  getVehicleEquipmentFromPcv,
  getVehicleOwnerFromPcv,
  getVehicleRemoval,
  queryDecoder
} from '../content/vehicle/server';
import VehicleTimeline from '../content/vehicle/componets/VehicleTimeline';
import { toTypedEntries } from '../content/data';
import Section from '../content/vehicle/componets/Section';
import DataPairsTable from '../content/vehicle/componets/DataPairsTable';
import VehicleImport from '../content/vehicle/componets/VehicleImports';
import VehicleRemoval from '../content/vehicle/componets/VehicleRemoval';
import VehicleInspections from '../content/vehicle/componets/VehicleInspections';
import VehicleOwners from '../content/vehicle/componets/VehicleOwners';
import VehicleEquipment from '../content/vehicle/componets/VehicleEquipment';
import Head from 'next/head';

export default function Vehicle(props: Props) {
  const {
    vehicle,
    vehicleImport,
    vehicleInspections,
    vehicleRemoval,
    vehicleOwners,
    vehicleEquipment
  } = props;
  const gridContent = sections
    .map((section) => ({
      ...section,
      options: section.options.filter((option) => includeValue(vehicle[option]))
    }))
    .filter((section) => Boolean(section.options.length))
    .concat({
      label: 'Ostatní Údaje',
      key: 'ostatni_udaje',
      options: (
        Object.keys(vehicle) as (keyof SerializableRegistration)[]
      ).filter(
        (key) =>
          key !== 'id' && !sections.some((sec) => sec.options.includes(key))
      )
    })
    .map((section) => {
      return (
        <Section key={section.key} label={section.label}>
          <DataPairsTable
            data={toTypedEntries(vehicle).filter(
              ([key, value]) =>
                section.options.includes(key) &&
                includeValue(value) &&
                shouldIncludeRegistrationField(key)
            )}
            renderRow={([key, value]) => {
              const { bindWith, ...rest } = getColumnName(key);
              return {
                ...rest,
                value:
                  valueToString(value) +
                  (bindWith ? `, ${valueToString(vehicle[bindWith])}` : '')
              };
            }}
          />
        </Section>
      );
    });
  if (vehicleImport) {
    gridContent.unshift(<VehicleImport vehicleImport={vehicleImport} />);
  }
  if (vehicleRemoval) {
    gridContent.unshift(<VehicleRemoval vehicleRemoval={vehicleRemoval} />);
  }
  if (vehicleEquipment.length) {
    gridContent.push(<VehicleEquipment vehicleEquipment={vehicleEquipment} />);
  }

  return (
    <>
      <Head>
        <title>
          Vozidlo {vehicle.tovarni_znacka}, {vehicle.obchodni_oznaceni} – Info o
          vozidlech
        </title>
        <meta name="description" content="Detail vozidla." />
      </Head>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12 }}>
          <Section label="Časová osa">
            <VehicleTimeline {...props} />
          </Section>
        </Grid>

        {Boolean(vehicleInspections.length) && (
          <Grid size={{ xs: 12 }}>
            <VehicleInspections vehicleInspections={vehicleInspections} />
          </Grid>
        )}
        {Boolean(vehicleOwners.length) && (
          <Grid size={{ xs: 12 }}>
            <VehicleOwners vehicleOwners={vehicleOwners} />
          </Grid>
        )}
        {gridContent.map((Component, index) => (
          <Grid key={index} size={{ xs: 12, md: 6 }}>
            {Component}
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query
}) => {
  const { id } = queryDecoder.parse(query);
  if (!id) return { notFound: true };
  const vehicle = await getVehicle(id);
  if (!vehicle) return { notFound: true };
  const [
    vehicleImport,
    vehicleInspections,
    vehicleRemoval,
    vehicleOwners,
    vehicleEquipment
  ] = await Promise.all([
    getImportFromPcv(vehicle.pcv),
    getInspectionsFromPcv(vehicle.pcv),
    getVehicleRemoval(vehicle.pcv),
    getVehicleOwnerFromPcv(vehicle.pcv),
    getVehicleEquipmentFromPcv(vehicle.pcv)
  ]);
  return {
    props: {
      vehicle,
      vehicleImport,
      vehicleInspections,
      vehicleRemoval,
      vehicleOwners,
      vehicleEquipment
    }
  };
};
