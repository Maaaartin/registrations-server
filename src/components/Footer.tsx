import * as React from 'react';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';

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
      <a
        href="https://github.com/Maaaartin/registrations-server"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          color: 'inherit',
          textDecoration: 'none'
        }}
      >
        <GitHubIcon fontSize="small" />
        GitHub
      </a>
    </Typography>
  );
}
