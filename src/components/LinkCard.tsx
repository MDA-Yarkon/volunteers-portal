import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import type { LinkItem } from '../config/content.schema';
import LinkIcon from './LinkIcon';

interface LinkCardProps {
  link: LinkItem;
}

export default function LinkCard({ link }: LinkCardProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'he' | 'en';

  return (
    <Card variant="outlined">
      <CardActionArea
        component="a"
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <LinkIcon type={link.type} />
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle1" fontWeight={600} noWrap>
              {link.title[lang]}
            </Typography>
            {link.description && (
              <Typography variant="body2" color="text.secondary" noWrap>
                {link.description[lang]}
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
