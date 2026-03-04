import { useState, useMemo } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { useContent } from '../../context/useContent';
import type { SectionConfig } from '../../config/content.schema';
import LocalizedStringField from './LocalizedStringField';
import SectionEditor from './SectionEditor';

export default function SectionsList() {
  const { t } = useTranslation();
  const { config, addSection, reorderSections } = useContent();
  const [addOpen, setAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState({ he: '', en: '' });
  const [newColumns, setNewColumns] = useState(6);

  const sortedSections = useMemo(
    () => [...config.sections].sort((a, b) => a.order - b.order),
    [config.sections],
  );

  const handleAdd = () => {
    const section: SectionConfig = {
      id: `section-${Date.now()}`,
      title: newTitle,
      order: config.sections.length + 1,
      columns: newColumns,
      links: [],
    };
    addSection(section);
    setNewTitle({ he: '', en: '' });
    setNewColumns(6);
    setAddOpen(false);
  };

  const handleMove = (index: number, direction: -1 | 1) => {
    const ids = sortedSections.map(s => s.id);
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= ids.length) return;
    [ids[index], ids[targetIndex]] = [ids[targetIndex], ids[index]];
    reorderSections(ids);
  };

  return (
    <Stack spacing={2}>
      {sortedSections.map((section, i) => (
        <SectionEditor
          key={section.id}
          section={section}
          onMoveUp={i > 0 ? () => handleMove(i, -1) : undefined}
          onMoveDown={i < sortedSections.length - 1 ? () => handleMove(i, 1) : undefined}
        />
      ))}

      <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setAddOpen(true)} sx={{ alignSelf: 'flex-start' }}>
        {t('manage.sections.add')}
      </Button>

      <Dialog open={addOpen} onClose={() => setAddOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t('manage.sections.add')}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <LocalizedStringField label={t('manage.meta.title')} value={newTitle} onChange={setNewTitle} />
            <TextField
              label={t('manage.sections.columns')}
              type="number"
              value={newColumns}
              onChange={e => setNewColumns(Number(e.target.value))}
              slotProps={{ htmlInput: { min: 1, max: 12 } }}
              sx={{ maxWidth: 200 }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddOpen(false)}>{t('manage.cancel')}</Button>
          <Button variant="contained" onClick={handleAdd} disabled={!newTitle.he && !newTitle.en}>
            {t('manage.sections.add')}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
