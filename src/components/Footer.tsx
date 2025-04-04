import * as React from 'react';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={[
        {
          color: 'text.secondary'
        }
      ]}
    >
      Kontakt:{' '}
      <a
        target="_blank"
        href="https://www.linkedin.com/in/martin-svoboda-36a904172/"
      >
        Martin Svoboda
      </a>
    </Typography>
  );
}
