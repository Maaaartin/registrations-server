import { ReactNode, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
// import Copyright from '../components/Copyright';
import StatCard from '../components/StatCard';
import useRequest from '../hooks/useRequest';
import { CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import RegistrationsChart from '../components/RegistrationsChart';
import { useCacheContext } from '../context/cache';
import { DNumber, DStringArray, DTopColors } from '../util/decoders';

const CountCard = () => {
  const [count, setCount] = useCacheContext().count;
  const request = useRequest({
    url: '/api/count',
    decoder: DNumber
  });
  useEffect(() => {
    if (!count && !request.value) {
      request.run();
    } else if (request.value) {
      setCount(request.value);
    }
  }, [count, request, setCount]);
  const renderValue = request.loading ? <CircularProgress /> : count;

  return <StatCard title="Vozidel v databázi" value={renderValue} />;
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
  const [topBrands, setTopBrands] = useCacheContext().topBrands;
  const request = useRequest({
    url: '/api/top-brands',
    decoder: DStringArray
  });
  useEffect(() => {
    if (!topBrands.length && !request.value) {
      request.run();
    } else if (request.value) {
      setTopBrands(request.value);
    }
  }, [topBrands, request, setTopBrands]);
  const renderValue = request.loading ? <CircularProgress /> : topBrands;
  const render = (value: string) => ({ primary: value });
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

const ColorsCard = () => {
  const [topColors, setTopColors] = useCacheContext().topColors;
  const request = useRequest({
    url: '/api/top-colors',
    decoder: DTopColors
  });
  useEffect(() => {
    if (!topColors.length && !request.value) {
      request.run();
    } else if (request.value) {
      setTopColors(request.value);
    }
  }, [topColors, request, setTopColors]);
  if (request.loading) {
    return <CircularProgress />;
  }
  const render = (value: { value: string; count: number }) => ({
    primary: value.value,
    secondary: value.count
  });

  return (
    <StatCard
      title="Top barvy"
      value={<CardList data={topColors} render={render}></CardList>}
    />
  );
};

export default function Stats() {
  return (
    <>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Statistiky
      </Typography>
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
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <RegistrationsChart />
      </Grid>
      {/* <Copyright sx={{ my: 4 }} /> */}
    </>
  );
}
