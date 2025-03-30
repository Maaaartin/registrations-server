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
import inspectionsColumnMap from '../util/vehicle/inspectionsColumnMap';
import registrationColumnMap from '../util/vehicle/registrationColumnMap';
import removalColumnsMap from '../util/vehicle/removalColumnsMap';
import importsColumnMap from '../util/vehicle/importsColumnMap';

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
      component: registrationColumnMap.datum_1_registrace.name
    });
  }
  if (vehicle.datum_1_registrace_v_cr) {
    data.push({
      date: DateTime.fromObject(vehicle.datum_1_registrace_v_cr),
      component: registrationColumnMap.datum_1_registrace_v_cr.name
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
        component: inspectionsColumnMap.platnost_od.description
      });
    }
    if (inspection.platnost_do) {
      data.push({
        date: DateTime.fromObject(inspection.platnost_do),
        component: inspectionsColumnMap.platnost_do.description
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
