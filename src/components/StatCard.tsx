import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { type PropsWithChildren } from 'react';

export type StatCardProps = PropsWithChildren<{
  title: string;
  collapse?: { open: boolean; onToggle: () => void };
}>;

export default function StatCard({ title, children, collapse }: StatCardProps) {
  return (
    <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography component="h3" variant="subtitle2" gutterBottom>
            {title}
          </Typography>
          {collapse && (
            <IconButton
              onClick={collapse.onToggle}
              sx={{
                padding: 0,
                minWidth: 0,
                minHeight: 0,
                border: 'none',
                '&:hover': { backgroundColor: 'transparent' }
              }}
            >
              {collapse.open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          )}
        </Stack>
        <Stack direction="column" sx={{ flexGrow: 1, gap: 1 }}>
          <Stack sx={{ justifyContent: 'space-between' }}>
            <Stack
              direction="row"
              sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              {children}
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
