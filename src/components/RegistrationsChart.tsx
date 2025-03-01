import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';
import useRequest from '../hooks/useRequest';
import { useCacheContext } from '../context/cache';
import { DRegistrationStats } from '../util/decoders';

function AreaGradient({ color, id }: { color: string; id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

export default function RegistrationsChart() {
  const theme = useTheme();
  const [registrationsPerYear, setRegistrationsPerYear] =
    useCacheContext().registrationsPerYear;
  const request = useRequest({
    url: '/api/registrations-per-year',
    decoder: DRegistrationStats
  });
  useEffect(() => {
    if (!registrationsPerYear.length && !request.value) {
      request.run();
    } else if (request.value) {
      setRegistrationsPerYear(request.value);
    }
  }, [registrationsPerYear, request, setRegistrationsPerYear]);

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark
  ];
  const years = registrationsPerYear.map(({ year }) => year);
  const values = registrationsPerYear.map(({ count }) => count);
  const sum = values.reduce((sum, curr) => (sum += curr), 0);
  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Počet registrací
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1
            }}
          >
            <Typography variant="h4" component="p">
              {sum}
            </Typography>
          </Stack>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data: years,
              tickInterval: (index, i) => (i + 1) % 5 === 0
            }
          ]}
          series={[
            {
              id: 'direct',
              label: 'Direct',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: values
            }
          ]}
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          loading={request.loading}
          sx={{
            '& .MuiAreaElement-series-organic': {
              fill: "url('#organic')"
            },
            '& .MuiAreaElement-series-referral': {
              fill: "url('#referral')"
            },
            '& .MuiAreaElement-series-direct': {
              fill: "url('#direct')"
            }
          }}
          slotProps={{
            legend: {
              hidden: true
            }
          }}
        >
          <AreaGradient color={theme.palette.primary.dark} id="organic" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
