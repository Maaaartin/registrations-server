import { ReactNode, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import StatCard from '../components/StatCard';
import useRequest, { UseRequestHook } from '../hooks/useRequest';
import { CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import zod from 'zod';
import { useStatsContext } from '../context/stats';

type UseStatsCartRenderingProps<T, D> = {
  request: UseRequestHook<T, D>;
  contextValue: T | void;
};

function useStatsCardRendering<T, D = any>({
  request,
  contextValue,
}: UseStatsCartRenderingProps<T, D>) {
  const isUndefined = typeof contextValue === 'undefined';
  useEffect(() => {
    isUndefined && request.run();
  }, [isUndefined]);
  if (!isUndefined) {
    return contextValue;
  }
  if (request.loading) {
    return <CircularProgress></CircularProgress>;
  }
  if (request.error) {
    return request.error.message;
  }
  return request.value;
}

const CountCard = () => {
  const { count, setCount } = useStatsContext();
  const request = useRequest({
    url: '/api/count',
    decoder: zod.number(),
  });
  const renderValue = useStatsCardRendering({ request, contextValue: count });
  useEffect(() => {
    if (typeof count === 'undefined' && request.value) {
      setCount(request.value);
    }
  }, [count, request.value]);

  return <StatCard title="Vozidel v databázi" value={renderValue} />;
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
  const renderValue = useStatsCardRendering({ request, contextValue: brands });
  useEffect(() => {
    if (!brands && request.value) {
      setBrands(request.value);
    }
  }, [request.value]);
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
  const renderValue = useStatsCardRendering({ request, contextValue: colors });
  useEffect(() => {
    if (request.value) {
      setColors(request.value);
    }
  }, [request.value]);
  const renderPrimary = (value: { value: string; count: number }) =>
    value.value;
  const renderSecondary = (value: { value: string; count: number }) =>
    value.count;
  return (
    <StatCard
      title="Top barvy"
      value={
        Array.isArray(renderValue) ? (
          <CardList
            data={renderValue}
            renderPrimary={renderPrimary}
            renderSecondary={renderSecondary}
          ></CardList>
        ) : (
          renderValue
        )
      }
    />
  );
};

const Co2Card = () => {
  const { co2, setCo2 } = useStatsContext();
  const request = useRequest({
    url: '/api/avg-co2',
    decoder: zod.number(),
  });
  const renderValue = useStatsCardRendering({ request, contextValue: co2 });
  useEffect(() => {
    if (typeof co2 === 'undefined' && request.value) {
      setCo2(request.value);
    }
  }, [co2, request.value]);

  return <StatCard title="Průměrné emise CO2" value={renderValue} />;
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
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Co2Card></Co2Card>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
