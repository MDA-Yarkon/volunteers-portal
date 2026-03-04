import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import MetaEditor from '../components/manage/MetaEditor';
import SectionsList from '../components/manage/SectionsList';
import ImportExportToolbar from '../components/manage/ImportExportToolbar';

export default function ManagePage() {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {t('manage.title')}
        </Typography>
      </Box>

      <MetaEditor />

      <Typography variant="h5" fontWeight={600} sx={{ mb: 2, mt: 4 }}>
        {t('manage.sections')}
      </Typography>
      <SectionsList />

      <ImportExportToolbar />
    </Container>
  );
}
