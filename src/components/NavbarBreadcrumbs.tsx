import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useRouter } from 'next/router';
import { mainListItems } from './MenuContent';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: theme.palette.action.disabled,
    margin: 1
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center'
  }
}));

export default function NavbarBreadcrumbs() {
  const router = useRouter();
  const viewName = mainListItems.find((item) => item.route === router.pathname);
  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography
        variant="h2"
        component="h2"
        sx={{ color: 'text.primary', fontWeight: 600 }}
      >
        {viewName?.text}
      </Typography>
    </StyledBreadcrumbs>
  );
}
