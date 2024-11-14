import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import axios from 'axios';
import StatCard, { StatCardProps } from '../components/StatCard';
import useRequest from '../hooks/useRequest';
import { CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import zod from 'zod';

const CountCard = () => {
  const request = useRequest({
    url: '/api/count',
    decoder: zod.number(),
  });
  useEffect(() => {
    request.run();
  }, []);
  const value = request.loading ? (
    <CircularProgress></CircularProgress>
  ) : request.error ? (
    request.error.message
  ) : (
    request.value
  );
  return <StatCard title="Vozidel v databázi" value={value} />;
};

const BrandsCard = () => {
  const request = useRequest({
    url: '/api/top-brands',
    decoder: zod.string().array(),
  });
  useEffect(() => {
    request.run();
  }, []);
  const value = request.loading ? (
    <CircularProgress></CircularProgress>
  ) : request.error ? (
    request.error.message
  ) : (
    <List dense>
      {request.value.map((brand, index) => (
        <ListItem key={index} disablePadding sx={{ display: 'block' }}>
          <ListItemText primary={brand} />
        </ListItem>
      ))}
    </List>
  );
  return <StatCard title="Top značky" value={value} />;
};

const ColorsCard = () => {
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
  const value = request.loading ? (
    <CircularProgress></CircularProgress>
  ) : request.error ? (
    request.error.message
  ) : (
    <List dense>
      {request.value.map(({ value, count }, index) => (
        <ListItem key={index} disablePadding sx={{ display: 'block' }}>
          <ListItemText primary={value} secondary={count} />
        </ListItem>
      ))}
    </List>
  );
  return <StatCard title="Top značky" value={value} />;
};

export default function HomePage() {
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
