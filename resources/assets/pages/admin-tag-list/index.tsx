import { Container, Divider } from '@mui/material';
import { useFetch } from 'react-fast-fetch';
import Tag from '../../types/models/Tag';
import TagEditor from './TagEditor';

export default function AdminTagListPage() {
  const { data: tags, reload } = useFetch<Tag[]>('/tags');

  return (
    <Container maxWidth="md">
      <TagEditor reload={reload} />
      <Divider />
      {tags?.map((tag) => (
        <TagEditor key={tag.id} tag={tag} reload={reload} />
      ))}
    </Container>
  );
}
