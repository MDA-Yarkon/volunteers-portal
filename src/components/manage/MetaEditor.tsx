import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import { useContent } from '../../context/useContent';
import LocalizedStringField from './LocalizedStringField';

export default function MetaEditor() {
  const { t } = useTranslation();
  const { config, updateMeta } = useContent();
  const { meta } = config;

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>{t('manage.meta')}</Typography>
      <Stack spacing={3}>
        <LocalizedStringField
          label={t('manage.meta.title')}
          value={meta.title}
          onChange={title => updateMeta({ ...meta, title })}
        />
        <LocalizedStringField
          label={t('manage.meta.subtitle')}
          value={meta.subtitle}
          onChange={subtitle => updateMeta({ ...meta, subtitle })}
        />
        <FormControl sx={{ maxWidth: 250 }}>
          <InputLabel>{t('manage.meta.defaultLang')}</InputLabel>
          <Select
            value={meta.defaultLanguage}
            label={t('manage.meta.defaultLang')}
            onChange={e => updateMeta({ ...meta, defaultLanguage: e.target.value as 'he' | 'en' })}
          >
            <MenuItem value="he">עברית</MenuItem>
            <MenuItem value="en">English</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Paper>
  );
}
