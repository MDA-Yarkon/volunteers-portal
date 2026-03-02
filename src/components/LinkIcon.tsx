import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import GavelIcon from '@mui/icons-material/Gavel';
import AssignmentIcon from '@mui/icons-material/Assignment';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import type { LinkType } from '../config/content.schema';

const iconMap: Record<LinkType, React.ElementType> = {
  video: PlayCircleOutlineIcon,
  document: DescriptionIcon,
  drive: FolderIcon,
  procedure: GavelIcon,
  form: AssignmentIcon,
  external: OpenInNewIcon,
};

interface LinkIconProps {
  type: LinkType;
}

export default function LinkIcon({ type }: LinkIconProps) {
  const Icon = iconMap[type] ?? OpenInNewIcon;
  return <Icon color="primary" sx={{ fontSize: 32 }} />;
}
