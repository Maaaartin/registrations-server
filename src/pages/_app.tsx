import * as React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../components/AppNavbar';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import AppTheme from '../theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../theme/customizations';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { CacheContextProvider } from '../context/cache';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

// Layout component with common structure
const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Technická data vozidel</title>
        <meta
          lang="cs"
          name="description"
          content="Portál pro vyhledávání v registru vozidel Ministerstva dopravy"
        />
      </Head>
      <AppTheme themeComponents={xThemeComponents}>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <CssBaseline />
          <Box sx={{ display: 'flex' }}>
            <SideMenu />
            <AppNavbar />
            <Box
              component="main"
              sx={(theme) => ({
                flexGrow: 1,
                backgroundColor: alpha(theme.palette.background.default, 1),
                overflow: 'auto',
              })}
            >
              <Stack
                spacing={2}
                sx={{
                  alignItems: 'center',
                  mx: 3,
                  pb: 5,
                  mt: { xs: 8, md: 0 },
                }}
              >
                <Header />
                <CacheContextProvider>
                  <Box
                    sx={{
                      width: '100%',
                      maxWidth: { sm: '100%', md: '1700px' },
                    }}
                  >
                    <Component {...pageProps} />
                  </Box>
                </CacheContextProvider>
              </Stack>
            </Box>
          </Box>
        </LocalizationProvider>
      </AppTheme>
    </>
  );
};

export default App;
