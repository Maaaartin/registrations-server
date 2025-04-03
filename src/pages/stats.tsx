import { ReactNode } from 'react';
import Grid from '@mui/material/Grid2';
// import Copyright from '../components/Copyright';
import StatCard from '../components/StatCard';
import { CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import RegistrationsChart from '../components/RegistrationsChart';
import { ValueCountPair } from '../content/data';
import useFetch from '../hooks/useFetch';
import {
  countAction,
  countriesImportsAction,
  topBrandsAction,
  topCategoriesAction,
  topColorsAction,
  topFuelsAction,
  topKindsAction
} from '../actions';

const CountCard = () => {
  const { data, isLoading } = useFetch(countAction);
  const renderValue = isLoading ? <CircularProgress /> : data;
  return <StatCard title="Celkový počet záznamů">{renderValue}</StatCard>;
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
    <StatCard title="Top značky">
      {Array.isArray(renderValue) ? (
        <CardList data={renderValue} render={render}></CardList>
      ) : (
        renderValue
      )}
    </StatCard>
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
    <StatCard title="Top kategorie">
      {Array.isArray(renderValue) ? (
        <CardList data={renderValue} render={render}></CardList>
      ) : (
        renderValue
      )}
    </StatCard>
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
    <StatCard title="Top druhy">
      {Array.isArray(renderValue) ? (
        <CardList data={renderValue} render={render}></CardList>
      ) : (
        renderValue
      )}
    </StatCard>
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
    <StatCard title="Top barvy">
      {Array.isArray(renderValue) ? (
        <CardList data={renderValue} render={render}></CardList>
      ) : (
        renderValue
      )}
    </StatCard>
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
    <StatCard title="Top paliva">
      {Array.isArray(renderValue) ? (
        <CardList data={renderValue} render={render}></CardList>
      ) : (
        renderValue
      )}
    </StatCard>
  );
};

const CountriesImportsCard = () => {
  const { data, isLoading } = useFetch(countriesImportsAction);
  const render = (value: { value: string; count: number }) => ({
    primary: value.value,
    secondary: value.count
  });
  const renderValue = isLoading ? <CircularProgress /> : data?.splice(0, 10);
  return (
    <StatCard title="Top země dovozu">
      {Array.isArray(renderValue) ? (
        <CardList data={renderValue} render={render}></CardList>
      ) : (
        renderValue
      )}
    </StatCard>
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
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <CountriesImportsCard></CountriesImportsCard>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <RegistrationsChart />
      </Grid>
      {/* <Copyright sx={{ my: 4 }} /> */}
    </>
  );
}
