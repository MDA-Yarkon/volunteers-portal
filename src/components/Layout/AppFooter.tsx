import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

export default function AppFooter() {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        textAlign: 'center',
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {t('footer.copyright', { year: new Date().getFullYear() })}
      </Typography>
    </Box>
  );
}
