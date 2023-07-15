import { Stack, SxProps } from '@mui/material';
import Tag from '../../types/models/Tag';
import TagChip from '../tag-chip';

export interface TagChipsProps {
  tags: Tag[];
  disabled?: boolean;
  sx?: SxProps;
}

export default function TagChips({ tags, disabled, sx }: TagChipsProps) {
  return (
    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={sx}>
      {tags.map((tag) => (
        <TagChip key={tag.id} tag={tag} disabled={disabled} />
      ))}
    </Stack>
  );
}
