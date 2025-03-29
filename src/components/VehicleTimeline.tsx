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
import { Props } from '../util/vehicle';

type TimelineObject = { date: Date; component: React.ReactNode };

function getTimelineObjects({
  vehicle,
  vehicleImport,
  vehicleInspections,
  vehicleRemoval
}: Props) {
  const data: TimelineObject[] = [];
  if (vehicle.datum_1_registrace) {
    data.push({
      date: new Date(vehicle.datum_1_registrace.value),
      component: 'Datum první registrace'
    });
  }
  if (vehicle.datum_1_registrace_v_cr) {
    data.push({
      date: new Date(vehicle.datum_1_registrace_v_cr.value),
      component: 'Datum první registrace v ČR'
    });
  }
  if (vehicleImport?.import_date) {
    data.push({
      date: new Date(vehicleImport.import_date.value),
      component: 'Import do ČR'
    });
  }
  if (vehicleRemoval) {
    if (vehicleRemoval.datum_do) {
      data.push({
        date: new Date(vehicleRemoval.datum_do.value),
        component: 'Vyřazeno z provozy'
      });
    }
    if (vehicleRemoval.datum_od) {
      data.push({
        date: new Date(vehicleRemoval.datum_od.value),
        component: 'Vyřazeno z provozy'
      });
    }
  }
  vehicleInspections.forEach((inspection) => {
    if (inspection.platnost_od) {
      data.push({
        date: new Date(inspection.platnost_od.value),
        component: `Začátek platnosti techniceké kontroly ${inspection.typ}`
      });
    }
    if (inspection.platnost_do) {
      data.push({
        date: new Date(inspection.platnost_do.value),
        component: `Konec platnosti techniceké kontroly ${inspection.typ}`
      });
    }
  });
  return data.sort((a, b) => a.date.getTime() - b.date.getTime());
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
              {date.toLocaleDateString()}
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
