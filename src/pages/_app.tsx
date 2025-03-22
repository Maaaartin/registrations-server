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
  treeViewCustomizations
} from '../theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations
};

// Layout component with common structure
const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Info o vozidlech</title>
        <meta
          lang="cs"
          name="Info o vozidlech"
          content="Portál pro vyhledávání v registru vozidel Ministerstva dopravy"
        />
      </Head>
      <AppTheme themeComponents={xThemeComponents}>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <SideMenu />
          <AppNavbar />
          <Box
            component="main"
            sx={(theme) => ({
              flexGrow: 1,
              backgroundColor: alpha(theme.palette.background.default, 1),
              overflow: 'auto'
            })}
          >
            <Stack
              spacing={2}
              sx={{
                alignItems: 'center',
                mx: 3,
                pb: 5,
                mt: { xs: 8, md: 0 }
              }}
            >
              <Header />
              <Box
                sx={{
                  width: '100%',
                  maxWidth: { sm: '100%', md: '1700px' }
                }}
              >
                <Component {...pageProps} />
              </Box>
            </Stack>
          </Box>
        </Box>
      </AppTheme>
    </>
  );
};

export default App;
