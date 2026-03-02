import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../LanguageToggle';

export default function AppHeader() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="sticky" elevation={2} sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
      <Toolbar>
        <Box
          component="img"
          src={`${import.meta.env.BASE_URL}assets/mda-logo.svg`}
          alt="MDA Logo"
          sx={{ height: isMobile ? 36 : 44, mr: 2 }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant={isMobile ? 'subtitle1' : 'h6'} fontWeight={700} color="primary">
            {t('app.title')}
          </Typography>
          {!isMobile && (
            <Typography variant="caption" color="text.secondary">
              {t('app.subtitle')}
            </Typography>
          )}
        </Box>
        <LanguageToggle />
      </Toolbar>
    </AppBar>
  );
}
