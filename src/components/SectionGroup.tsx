import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import type { SectionConfig } from '../config/content.schema';
import LinkCard from './LinkCard';

interface SectionGroupProps {
  section: SectionConfig;
}

export default function SectionGroup({ section }: SectionGroupProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'he' | 'en';

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {section.title[lang]}
      </Typography>
      {section.subtitle && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {section.subtitle[lang]}
        </Typography>
      )}
      <Stack spacing={1.5}>
        {section.links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </Stack>
    </Box>
  );
}
