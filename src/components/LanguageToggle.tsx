import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const isHebrew = i18n.language === 'he';

  const toggleLanguage = () => {
    i18n.changeLanguage(isHebrew ? 'en' : 'he');
  };

  return (
    <Box
      onClick={toggleLanguage}
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        gap: 0.5,
      }}
      role="button"
      aria-label="Toggle language"
    >
      <Typography
        variant="body2"
        fontWeight={!isHebrew ? 700 : 400}
        sx={{ opacity: !isHebrew ? 1 : 0.5 }}
      >
        EN
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.4 }}>
        |
      </Typography>
      <Typography
        variant="body2"
        fontWeight={isHebrew ? 700 : 400}
        sx={{ opacity: isHebrew ? 1 : 0.5 }}
      >
        עב׳
      </Typography>
    </Box>
  );
}
