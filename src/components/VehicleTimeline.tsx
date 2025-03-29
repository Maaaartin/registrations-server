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
import { displayDateFormat, Props } from '../util/vehicle';
import { DateTime } from 'luxon';

type TimelineObject = { date: DateTime; component: React.ReactNode };

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
      component: 'Datum první registrace'
    });
  }
  if (vehicle.datum_1_registrace_v_cr) {
    data.push({
      date: DateTime.fromObject(vehicle.datum_1_registrace_v_cr),
      component: 'Datum první registrace v ČR'
    });
  }
  if (vehicleImport?.import_date) {
    data.push({
      date: DateTime.fromObject(vehicleImport.import_date),
      component: 'Import do ČR'
    });
  }
  if (vehicleRemoval) {
    if (vehicleRemoval.datum_do) {
      data.push({
        date: DateTime.fromObject(vehicleRemoval.datum_do),
        component: 'Vyřazeno z provozy'
      });
    }
    if (vehicleRemoval.datum_od) {
      data.push({
        date: DateTime.fromObject(vehicleRemoval.datum_od),
        component: 'Vyřazeno z provozy'
      });
    }
  }
  vehicleInspections.forEach((inspection) => {
    if (inspection.platnost_od) {
      data.push({
        date: DateTime.fromObject(inspection.platnost_od),
        component: `Začátek platnosti techniceké kontroly ${inspection.typ}`
      });
    }
    if (inspection.platnost_do) {
      data.push({
        date: DateTime.fromObject(inspection.platnost_do),
        component: `Konec platnosti techniceké kontroly ${inspection.typ}`
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
            <TimelineOppositeContent color="textSecondary">
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
