import { useTranslation } from 'react-i18next';
import type { Direction } from '@mui/material/styles';

const RTL_LANGUAGES = ['he', 'ar'];

export function useDirection(): Direction {
  const { i18n } = useTranslation();
  return RTL_LANGUAGES.includes(i18n.language) ? 'rtl' : 'ltr';
}
