import { useRef, useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import RestoreIcon from '@mui/icons-material/Restore';
import PreviewIcon from '@mui/icons-material/Preview';
import { useTranslation } from 'react-i18next';
import { useContent } from '../../context/useContent';

export default function ImportExportToolbar() {
  const { t } = useTranslation();
  const { exportConfig, importConfig, resetConfig } = useContent();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false, message: '', severity: 'success',
  });

  const handleExport = () => {
    const json = exportConfig();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portal-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const success = importConfig(reader.result as string);
      setSnackbar({
        open: true,
        message: success ? t('manage.import.success') : t('manage.import.error'),
        severity: success ? 'success' : 'error',
      });
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReset = () => {
    resetConfig();
    setConfirmReset(false);
    setSnackbar({ open: true, message: t('manage.reset.success'), severity: 'success' });
  };

  return (
    <>
      <Paper sx={{ p: 2, mt: 3, position: 'sticky', bottom: 16 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button variant="outlined" startIcon={<FileDownloadIcon />} onClick={handleExport}>
            {t('manage.export')}
          </Button>
          <Button variant="outlined" startIcon={<FileUploadIcon />} onClick={() => fileInputRef.current?.click()}>
            {t('manage.import')}
          </Button>
          <input ref={fileInputRef} type="file" accept=".json" hidden onChange={handleImport} />
          <Button variant="outlined" color="warning" startIcon={<RestoreIcon />} onClick={() => setConfirmReset(true)}>
            {t('manage.reset')}
          </Button>
          <Button variant="contained" startIcon={<PreviewIcon />} onClick={() => window.open('#/', '_blank')}>
            {t('manage.preview')}
          </Button>
        </Stack>
      </Paper>

      <Dialog open={confirmReset} onClose={() => setConfirmReset(false)}>
        <DialogTitle>{t('manage.confirm.reset')}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmReset(false)}>{t('manage.cancel')}</Button>
          <Button color="error" variant="contained" onClick={handleReset}>{t('manage.reset')}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
}
