import { Avatar, Chip, SxProps } from '@mui/material';
import { Link } from 'react-router-dom';
import Tag from '../../types/models/Tag';

export interface TagChipProps {
  tag: Tag;
  disabled?: boolean;
  sx?: SxProps;
}

export default function TagChip({ tag, disabled, sx }: TagChipProps) {
  const linkProps = disabled ? {} : { component: Link, to: `/t/${tag.slug}` };

  return (
    <Chip
      {...linkProps}
      label={tag.name}
      icon={
        <Avatar src={tag.icon?.url} sx={{ width: 24, height: 24, fontSize: 14 }}>
          {tag.name.substring(0, 2)}
        </Avatar>
      }
      sx={{ cursor: disabled ? 'normal' : 'pointer', ...sx }}
    />
  );
}
