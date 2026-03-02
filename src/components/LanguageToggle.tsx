import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TranslateIcon from '@mui/icons-material/Translate';
import { useTranslation } from 'react-i18next';

export default function LanguageToggle() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'he' ? 'en' : 'he';
    i18n.changeLanguage(nextLang);
  };

  return (
    <Tooltip title={t('language.toggle')}>
      <IconButton color="inherit" onClick={toggleLanguage} aria-label={t('language.toggle')}>
        <TranslateIcon />
      </IconButton>
    </Tooltip>
  );
}
