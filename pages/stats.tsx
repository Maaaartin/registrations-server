import { ReactNode, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import StatCard from '../components/StatCard';
import useRequest from '../hooks/useRequest';
import { CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import zod from 'zod';
import { useStatsContext } from '../context/stats';

const CountCard = () => {
  const { count, setCount } = useStatsContext();
  const request = useRequest({
    url: '/api/count',
    decoder: zod.number(),
  });
  useEffect(() => {
    request.run();
  }, []);
  useEffect(() => {
    if (request.value) {
      setCount(request.value);
    }
  }, [request.value]);
  if (typeof count === 'number') {
    return <StatCard title="Vozidel v databázi" value={count} />;
  }
  const value = request.loading ? (
    <CircularProgress></CircularProgress>
  ) : request.error ? (
    request.error.message
  ) : (
    request.value
  );
  return <StatCard title="Vozidel v databázi" value={value} />;
};

function CardList<T>({
  data,
  renderPrimary,
  renderSecondary,
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
  const { brands, setBrands } = useStatsContext();
  const request = useRequest({
    url: '/api/top-brands',
    decoder: zod.string().array(),
  });
  useEffect(() => {
    request.run();
  }, []);
  useEffect(() => {
    if (request.value) {
      setBrands(request.value);
    }
  }, [request.value]);
  const renderPrimary = (value: string) => value;
  if (brands) {
    return (
      <StatCard
        title="Top značky"
        value={
          <CardList data={brands} renderPrimary={renderPrimary}></CardList>
        }
      />
    );
  }
  const value = request.loading ? (
    <CircularProgress></CircularProgress>
  ) : request.error ? (
    request.error.message
  ) : (
    <CardList data={request.value} renderPrimary={renderPrimary}></CardList>
  );
  return <StatCard title="Top značky" value={value} />;
};

const ColorsCard = () => {
  const { colors, setColors } = useStatsContext();
  const request = useRequest({
    url: '/api/top-colors',
    decoder: zod
      .object({
        value: zod.string(),
        count: zod.number(),
      })
      .array(),
  });
  useEffect(() => {
    request.run();
  }, []);
  useEffect(() => {
    if (request.value) {
      setColors(request.value);
    }
  }, [request.value]);
  const renderPrimary = (value: { value: string; count: number }) =>
    value.value;
  const renderSecondary = (value: { value: string; count: number }) =>
    value.count;
  if (colors) {
    return (
      <StatCard
        title="Top barvy"
        value={
          <CardList
            data={colors}
            renderPrimary={renderPrimary}
            renderSecondary={renderSecondary}
          ></CardList>
        }
      />
    );
  }
  const value = request.loading ? (
    <CircularProgress></CircularProgress>
  ) : request.error ? (
    request.error.message
  ) : (
    <CardList
      data={request.value}
      renderPrimary={renderPrimary}
      renderSecondary={renderSecondary}
    ></CardList>
  );
  return <StatCard title="Top barvy" value={value} />;
};

export default function Stats() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
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
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
