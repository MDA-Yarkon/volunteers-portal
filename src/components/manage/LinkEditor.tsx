import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useTranslation } from 'react-i18next';
import type { LinkItem, LinkType } from '../../config/content.schema';
import LocalizedStringField from './LocalizedStringField';

const LINK_TYPES: LinkType[] = ['video', 'document', 'drive', 'external', 'procedure', 'form'];

interface LinkEditorProps {
  link: LinkItem;
  onChange: (updates: Partial<LinkItem>) => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export default function LinkEditor({ link, onChange, onDelete, onMoveUp, onMoveDown }: LinkEditorProps) {
  const { t } = useTranslation();

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            {link.title.he || link.title.en || link.id}
          </Typography>
          <Box>
            {onMoveUp && (
              <IconButton size="small" onClick={onMoveUp}><ArrowUpwardIcon fontSize="small" /></IconButton>
            )}
            {onMoveDown && (
              <IconButton size="small" onClick={onMoveDown}><ArrowDownwardIcon fontSize="small" /></IconButton>
            )}
            <IconButton size="small" color="error" onClick={onDelete}><DeleteIcon fontSize="small" /></IconButton>
          </Box>
        </Box>
        <Stack spacing={2}>
          <LocalizedStringField
            label={t('manage.meta.title')}
            value={link.title}
            onChange={title => onChange({ title })}
          />
          <TextField
            label={t('manage.links.url')}
            value={link.url}
            onChange={e => onChange({ url: e.target.value })}
            fullWidth
            slotProps={{ htmlInput: { dir: 'ltr' } }}
          />
          <LocalizedStringField
            label={t('manage.links.description')}
            value={link.description ?? { he: '', en: '' }}
            onChange={description => onChange({ description })}
          />
          <FormControl sx={{ maxWidth: 250 }}>
            <InputLabel>{t('manage.links.type')}</InputLabel>
            <Select
              value={link.type}
              label={t('manage.links.type')}
              onChange={e => onChange({ type: e.target.value as LinkType })}
            >
              {LINK_TYPES.map(type => (
                <MenuItem key={type} value={type}>{t(`manage.linkType.${type}`)}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </CardContent>
    </Card>
  );
}
