import { Avatar, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import Tag from '../../types/models/Tag';

export interface TagListItemProps {
  tag: Tag;
}

export default function TagListItem({ tag }: TagListItemProps) {
  const { tagId } = useParams();
  return (
    <ListItemButton
      component={Link}
      to={`/t/${tag.slug}`}
      selected={tagId === tag.id.toString() || tagId === tag.slug}
    >
      <ListItemIcon>
        <Avatar src={tag.icon?.url} style={{ width: 24, height: 24 }}>
          {tag.name.substring(0, 2)}
        </Avatar>
      </ListItemIcon>
      <ListItemText primary={tag.name} />
    </ListItemButton>
  );
}
