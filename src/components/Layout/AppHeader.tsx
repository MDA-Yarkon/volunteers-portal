import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import LanguageToggle from '../LanguageToggle';

export default function AppHeader() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const navigate = useNavigate();
  const isManagePage = location.pathname === '/manage';

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
        <IconButton
          onClick={() => navigate(isManagePage ? '/' : '/manage')}
          sx={{ ml: 1 }}
          title={isManagePage ? t('manage.backToPortal') : t('manage.title')}
        >
          {isManagePage ? <ArrowBackIcon /> : <SettingsIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
