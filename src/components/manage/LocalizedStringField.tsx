import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import type { LocalizedString } from '../../config/content.schema';

interface LocalizedStringFieldProps {
  label: string;
  value: LocalizedString;
  onChange: (value: LocalizedString) => void;
  multiline?: boolean;
}

export default function LocalizedStringField({ label, value, onChange, multiline }: LocalizedStringFieldProps) {
  const { t } = useTranslation();

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <TextField
        label={`${label} (${t('manage.field.hebrew')})`}
        value={value.he}
        onChange={e => onChange({ ...value, he: e.target.value })}
        fullWidth
        multiline={multiline}
        minRows={multiline ? 2 : undefined}
        slotProps={{ htmlInput: { dir: 'rtl' } }}
      />
      <TextField
        label={`${label} (${t('manage.field.english')})`}
        value={value.en}
        onChange={e => onChange({ ...value, en: e.target.value })}
        fullWidth
        multiline={multiline}
        minRows={multiline ? 2 : undefined}
        slotProps={{ htmlInput: { dir: 'ltr' } }}
      />
    </Stack>
  );
}
