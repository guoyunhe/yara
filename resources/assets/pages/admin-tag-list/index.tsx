import { Container } from '@mui/material';
import { useFetch } from 'react-fast-fetch';
import Tag from '../../types/models/Tag';
import TagEditor from './TagEditor';

export default function AdminTagListPage() {
  const { data: tags, reload } = useFetch<Tag[]>('/tags');

  return (
    <Container>
      <TagEditor onDone={reload} />
      {tags?.map((tag) => (
        <TagEditor key={tag.id} tag={tag} />
      ))}
    </Container>
  );
}
