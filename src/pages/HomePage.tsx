import { useMemo } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { portalConfig } from '../config/content';
import SectionGroup from '../components/SectionGroup';

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'he' | 'en';

  const sortedSections = useMemo(
    () => [...portalConfig.sections].sort((a, b) => a.order - b.order),
    [],
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="h3" fontWeight={800} color="primary" gutterBottom>
          {portalConfig.meta.title[lang]}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {t('app.hero')}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {sortedSections.map((section) => (
          <Grid key={section.id} size={{ xs: 12, md: section.columns ?? 6 }}>
            <SectionGroup section={section} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
