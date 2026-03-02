import { useMemo, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { useDirection } from './hooks/useDirection';
import { createAppTheme } from './theme';
import { rtlCache, ltrCache } from './theme/rtlCache';
import PageLayout from './components/Layout/PageLayout';
import HomePage from './pages/HomePage';

import '@fontsource/rubik/300.css';
import '@fontsource/rubik/400.css';
import '@fontsource/rubik/500.css';
import '@fontsource/rubik/700.css';

export default function App() {
  const direction = useDirection();
  const theme = useMemo(() => createAppTheme(direction), [direction]);
  const cache = direction === 'rtl' ? rtlCache : ltrCache;

  useEffect(() => {
    document.dir = direction;
    document.documentElement.lang = direction === 'rtl' ? 'he' : 'en';
  }, [direction]);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PageLayout>
          <HomePage />
        </PageLayout>
      </ThemeProvider>
    </CacheProvider>
  );
}
