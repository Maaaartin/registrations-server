import { ReactNode, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
// import Copyright from '../components/Copyright';
import StatCard from '../components/StatCard';
import useRequest from '../hooks/useRequest';
import { List, ListItem, ListItemText } from '@mui/material';
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
    if (isNaN(count) && !request.value) {
      request.run();
    } else if (request.value) {
      setCount(request.value);
    }
  }, [count, request, setCount]);
  const renderValue = count;

  return <StatCard title="Vozidel v databázi" value={renderValue} />;
};

function CardList<T>({
  data,
  renderPrimary,
  renderSecondary
}: {
  data: T[];
  renderPrimary: (value: T) => ReactNode;
  renderSecondary?: (value: T) => ReactNode;
}) {
  return (
    <List dense>
      {data.map((value, index) => (
        <ListItem key={index} disablePadding sx={{ display: 'block' }}>
          <ListItemText
            primary={renderPrimary(value)}
            secondary={renderSecondary?.(value)}
          />
        </ListItem>
      ))}
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
  const renderValue = topBrands;
  const renderPrimary = (value: string) => value;
  return (
    <StatCard
      title="Top značky"
      value={
        Array.isArray(renderValue) ? (
          <CardList data={renderValue} renderPrimary={renderPrimary}></CardList>
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
  const renderValue = topColors;
  const renderPrimary = (value: { value: string; count: number }) =>
    value.value;
  const renderSecondary = (value: { value: string; count: number }) =>
    value.count;
  return (
    <StatCard
      title="Top barvy"
      value={
        <CardList
          data={renderValue}
          renderPrimary={renderPrimary}
          renderSecondary={renderSecondary}
        ></CardList>
      }
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
