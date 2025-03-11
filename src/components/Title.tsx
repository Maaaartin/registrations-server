import * as React from 'react';
import { Typography, Box, Stack } from '@mui/material';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import Link from 'next/link';

function CustomIcon() {
  return (
    <Box
      sx={{
        width: '1.5rem',
        height: '1.5rem',
        bgcolor: 'black',
        borderRadius: '999px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundImage:
          'linear-gradient(135deg, hsl(210, 98%, 60%) 0%, hsl(210, 100%, 35%) 100%)',
        color: 'hsla(210, 100%, 95%, 0.9)',
        border: '1px solid',
        borderColor: 'hsl(210, 100%, 55%)',
        boxShadow: 'inset 0 2px 5px rgba(255, 255, 255, 0.3)'
      }}
    >
      <DirectionsCarFilledIcon color="inherit" sx={{ fontSize: '1rem' }} />
    </Box>
  );
}

export default function Title() {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ justifyContent: 'center', mr: 'auto' }}
    >
      <CustomIcon />
      <Typography variant="h4" component="h1" sx={{ color: 'text.primary' }}>
        <Link href="/">Info o vozidlech</Link>
      </Typography>
    </Stack>
  );
}
