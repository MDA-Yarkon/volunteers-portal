import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import type { SectionConfig, LinkItem } from '../../config/content.schema';
import { useContent } from '../../context/useContent';
import LocalizedStringField from './LocalizedStringField';
import LinkEditor from './LinkEditor';

interface SectionEditorProps {
  section: SectionConfig;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export default function SectionEditor({ section, onMoveUp, onMoveDown }: SectionEditorProps) {
  const { t } = useTranslation();
  const { updateSection, removeSection, updateLink, addLink, removeLink, reorderLinks } = useContent();
  const [addLinkOpen, setAddLinkOpen] = useState(false);
  const [newLinkTitle, setNewLinkTitle] = useState({ he: '', en: '' });
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleAddLink = () => {
    const id = `link-${Date.now()}`;
    const link: LinkItem = {
      id,
      title: newLinkTitle,
      url: newLinkUrl,
      type: 'external',
    };
    addLink(section.id, link);
    setNewLinkTitle({ he: '', en: '' });
    setNewLinkUrl('');
    setAddLinkOpen(false);
  };

  const handleMoveLink = (linkIndex: number, direction: -1 | 1) => {
    const ids = section.links.map(l => l.id);
    const targetIndex = linkIndex + direction;
    if (targetIndex < 0 || targetIndex >= ids.length) return;
    [ids[linkIndex], ids[targetIndex]] = [ids[targetIndex], ids[linkIndex]];
    reorderLinks(section.id, ids);
  };

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', pr: 2 }}>
            <Typography sx={{ flexGrow: 1 }}>
              {section.title.he || section.title.en} ({section.links.length} {t('manage.links.count')})
            </Typography>
            {onMoveUp && (
              <IconButton size="small" onClick={e => { e.stopPropagation(); onMoveUp(); }}>
                <ArrowUpwardIcon fontSize="small" />
              </IconButton>
            )}
            {onMoveDown && (
              <IconButton size="small" onClick={e => { e.stopPropagation(); onMoveDown(); }}>
                <ArrowDownwardIcon fontSize="small" />
              </IconButton>
            )}
            <IconButton size="small" color="error" onClick={e => { e.stopPropagation(); setConfirmDelete(true); }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={3}>
            <LocalizedStringField
              label={t('manage.meta.title')}
              value={section.title}
              onChange={title => updateSection(section.id, { title })}
            />
            <LocalizedStringField
              label={t('manage.sections.subtitle')}
              value={section.subtitle ?? { he: '', en: '' }}
              onChange={subtitle => updateSection(section.id, { subtitle })}
            />
            <TextField
              label={t('manage.sections.columns')}
              type="number"
              value={section.columns ?? 6}
              onChange={e => updateSection(section.id, { columns: Number(e.target.value) })}
              slotProps={{ htmlInput: { min: 1, max: 12 } }}
              sx={{ maxWidth: 200 }}
            />

            <Typography variant="subtitle1" fontWeight={600}>{t('manage.links.title')}</Typography>

            {section.links.map((link, i) => (
              <LinkEditor
                key={link.id}
                link={link}
                onChange={updates => updateLink(section.id, link.id, updates)}
                onDelete={() => removeLink(section.id, link.id)}
                onMoveUp={i > 0 ? () => handleMoveLink(i, -1) : undefined}
                onMoveDown={i < section.links.length - 1 ? () => handleMoveLink(i, 1) : undefined}
              />
            ))}

            <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setAddLinkOpen(true)}>
              {t('manage.links.add')}
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Dialog open={addLinkOpen} onClose={() => setAddLinkOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t('manage.links.add')}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <LocalizedStringField
              label={t('manage.meta.title')}
              value={newLinkTitle}
              onChange={setNewLinkTitle}
            />
            <TextField
              label={t('manage.links.url')}
              value={newLinkUrl}
              onChange={e => setNewLinkUrl(e.target.value)}
              fullWidth
              slotProps={{ htmlInput: { dir: 'ltr' } }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddLinkOpen(false)}>{t('manage.cancel')}</Button>
          <Button variant="contained" onClick={handleAddLink} disabled={!newLinkTitle.he && !newLinkTitle.en}>
            {t('manage.links.add')}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <DialogTitle>{t('manage.confirm.delete')}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)}>{t('manage.cancel')}</Button>
          <Button color="error" variant="contained" onClick={() => { removeSection(section.id); setConfirmDelete(false); }}>
            {t('manage.sections.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
