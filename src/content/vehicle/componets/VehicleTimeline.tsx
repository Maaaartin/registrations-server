import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses
} from '@mui/lab/TimelineOppositeContent';
import { displayDateFormat, Props, SerializableInspection } from '..';
import { DateTime } from 'luxon';
import inspectionsColumnMap from '../inspectionsColumnMap';
import registrationColumnMap from '../registrationColumnMap';
import removalColumnsMap from '../removalColumnsMap';
import importsColumnMap from '../importsColumnMap';
import TextWithDescription from '../../../components/TextWithDescription';
import {
  Card,
  CardContent,
  List,
  ListItem,
  Stack,
  Typography
} from '@mui/material';

type TimelineObject = { date: DateTime; component: React.ReactNode };

const inspectionDisplayKeys = [
  'typ',
  'stav',
  'cislo_protokolu',
  'nazev_stk',
  'kod_stk'
] as const;
function InspectionView({
  vehicleInspection
}: {
  vehicleInspection: SerializableInspection;
}) {
  return (
    <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="caption" gutterBottom>
            Techinická prohlídka
          </Typography>
        </Stack>
        <Stack direction="column" sx={{ flexGrow: 1, gap: 1 }}>
          <List>
            {inspectionDisplayKeys
              .filter((key) => vehicleInspection[key])
              .map((key) => (
                <ListItem key={key}>
                  {`${inspectionsColumnMap[key].name}: ${vehicleInspection[key]}`}
                </ListItem>
              ))}
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
}

function getTimelineObjects({
  vehicle,
  vehicleImport,
  vehicleInspections,
  vehicleRemoval
}: Props) {
  const data: TimelineObject[] = [];
  if (vehicle.datum_1_registrace) {
    data.push({
      date: DateTime.fromObject(vehicle.datum_1_registrace),
      component: (
        <TextWithDescription {...registrationColumnMap.datum_1_registrace} />
      )
    });
  }
  if (vehicle.datum_1_registrace_v_cr) {
    data.push({
      date: DateTime.fromObject(vehicle.datum_1_registrace_v_cr),
      component: (
        <TextWithDescription
          {...registrationColumnMap.datum_1_registrace_v_cr}
        />
      )
    });
  }
  if (vehicleImport?.import_date) {
    data.push({
      date: DateTime.fromObject(vehicleImport.import_date),
      component: importsColumnMap.import_date.name
    });
  }
  if (vehicleRemoval) {
    if (vehicleRemoval.datum_do) {
      data.push({
        date: DateTime.fromObject(vehicleRemoval.datum_do),
        component: removalColumnsMap.datum_do.name
      });
    }
    if (vehicleRemoval.datum_od) {
      data.push({
        date: DateTime.fromObject(vehicleRemoval.datum_od),
        component: removalColumnsMap.datum_od.name
      });
    }
  }
  vehicleInspections.forEach((inspection) => {
    if (inspection.platnost_od) {
      data.push({
        date: DateTime.fromObject(inspection.platnost_od),
        component: <InspectionView vehicleInspection={inspection} />
      });
    }
    if (inspection.platnost_do) {
      data.push({
        date: DateTime.fromObject(inspection.platnost_do),
        component:
          inspectionsColumnMap.platnost_do.description +
          (inspection.platnost_od
            ? ` z ${DateTime.fromObject(inspection.platnost_od).toFormat(displayDateFormat)}`
            : '')
      });
    }
  });
  return data.sort((a, b) => a.date.toMillis() - b.date.toMillis());
}

export default function VehicleTimeline(props: Props) {
  const data = getTimelineObjects(props);
  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2
        }
      }}
    >
      {data.map(({ date, component }, index) => {
        return (
          <TimelineItem key={index}>
            <TimelineOppositeContent>
              {date.toFormat(displayDateFormat)}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>{component}</TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}
