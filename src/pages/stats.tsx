import { ReactNode } from 'react';
import Grid from '@mui/material/Grid2';
// import Copyright from '../components/Copyright';
import StatCard from '../components/StatCard';
import { CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import RegistrationsChart from '../components/RegistrationsChart';
import { ValueCountPair } from '../util/registrations';
import useFetch from '../hooks/useFetch';
import {
  countAction,
  topBrandsAction,
  topCategoriesAction,
  topColorsAction,
  topFuelsAction,
  topKindsAction
} from '../actions';

const CountCard = () => {
  const { data, isLoading } = useFetch(countAction);
  const renderValue = isLoading ? <CircularProgress /> : data;
  return <StatCard title="Celkový počet záznamů" value={renderValue} />;
};

function CardList<T>({
  data,
  render
}: {
  data: T[];
  render: (value: T) => { primary: ReactNode; secondary?: ReactNode };
}) {
  return (
    <List dense>
      {data.map((value, index) => {
        const { primary, secondary } = render(value);
        return (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemText primary={primary} secondary={secondary} />
          </ListItem>
        );
      })}
    </List>
  );
}

const BrandsCard = () => {
  const { data, isLoading } = useFetch(topBrandsAction);
  const renderValue = isLoading ? <CircularProgress /> : data;
  const render = (value: ValueCountPair) => ({
    primary: value.value,
    secondary: value.count
  });
  return (
    <StatCard
      title="Top značky"
      value={
        Array.isArray(renderValue) ? (
          <CardList data={renderValue} render={render}></CardList>
        ) : (
          renderValue
        )
      }
    />
  );
};

const CategoriesCard = () => {
  const { data, isLoading } = useFetch(topCategoriesAction);
  const renderValue = isLoading ? <CircularProgress /> : data;
  const render = (value: ValueCountPair) => ({
    primary: value.value,
    secondary: value.count
  });
  return (
    <StatCard
      title="Top kategorie"
      value={
        Array.isArray(renderValue) ? (
          <CardList data={renderValue} render={render}></CardList>
        ) : (
          renderValue
        )
      }
    />
  );
};

const KindsCard = () => {
  const { data, isLoading } = useFetch(topKindsAction);
  const renderValue = isLoading ? <CircularProgress /> : data;
  const render = (value: ValueCountPair) => ({
    primary: value.value,
    secondary: value.count
  });
  return (
    <StatCard
      title="Top druhy"
      value={
        Array.isArray(renderValue) ? (
          <CardList data={renderValue} render={render}></CardList>
        ) : (
          renderValue
        )
      }
    />
  );
};

const ColorsCard = () => {
  const { data, isLoading } = useFetch(topColorsAction);
  const render = (value: { value: string; count: number }) => ({
    primary: value.value,
    secondary: value.count
  });
  const renderValue = isLoading ? <CircularProgress /> : data;
  return (
    <StatCard
      title="Top barvy"
      value={
        Array.isArray(renderValue) ? (
          <CardList data={renderValue} render={render}></CardList>
        ) : (
          renderValue
        )
      }
    />
  );
};

const FuelsCard = () => {
  const { data, isLoading } = useFetch(topFuelsAction);
  const render = (value: { value: string; count: number }) => ({
    primary: value.value,
    secondary: value.count
  });
  const renderValue = isLoading ? <CircularProgress /> : data;
  return (
    <StatCard
      title="Top paliva"
      value={
        Array.isArray(renderValue) ? (
          <CardList data={renderValue} render={render}></CardList>
        ) : (
          renderValue
        )
      }
    />
  );
};

export default function Stats() {
  return (
    <>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <CountCard></CountCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <BrandsCard></BrandsCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <ColorsCard></ColorsCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KindsCard></KindsCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <CategoriesCard></CategoriesCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <FuelsCard></FuelsCard>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <RegistrationsChart />
      </Grid>
      {/* <Copyright sx={{ my: 4 }} /> */}
    </>
  );
}
