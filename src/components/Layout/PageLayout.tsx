import Box from '@mui/material/Box';
import type { ReactNode } from 'react';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppHeader />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <AppFooter />
    </Box>
  );
}
