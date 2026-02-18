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
  datePickersCustomizations
} from '../theme/customizations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations
};

const getPathName = (url: string) => url.split('/')[1].split('?')[0];

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      if (getPathName(url) !== getPathName(window.location.pathname)) {
        setLoading(true);
      }
    };

    const handleComplete = () => {
      setLoading(false);
    };

    const handleError = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleError);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Info o vozidlech</title>
      </Head>
      <AppTheme themeComponents={xThemeComponents}>
        <CssBaseline />
        <Box sx={{ display: 'flex', cursor: loading ? 'wait' : 'default' }}>
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
              {loading && (
                <CircularProgress
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    zIndex: 1
                  }}
                />
              )}
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
