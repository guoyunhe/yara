import { Avatar, SxProps } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import Tag from '../../types/models/Tag';
import TagChips from '../tag-chips';

export interface TagSelectProps {
  value: Tag[];
  onChange: (value: Tag[]) => void;
  sx?: SxProps;
}

export default function TagSelect({ value, onChange, sx }: TagSelectProps) {
  const { t } = useTranslation();
  const { data: tags = [] } = useFetch<Tag[]>('/tags');
  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;
    onChange(
      (typeof value === 'string' ? [] : value).map((id) => tags.find((tag) => tag.id === id)!)
    );
  };

  return (
    <FormControl fullWidth sx={sx}>
      <InputLabel>{t('Tags')}</InputLabel>
      <Select
        multiple
        value={value.map((tag) => tag.id)}
        onChange={handleChange}
        input={<OutlinedInput label={t('Tags')} fullWidth />}
        renderValue={(selected) => {
          // Use a boolean filter to remove undefined when tags are not loaded yet
          const selectedTags = selected
            .map((id) => tags.find((tag) => tag.id === id))
            .filter(Boolean);
          return <TagChips tags={selectedTags as Tag[]} disabled />;
        }}
      >
        {tags.map((tag) => (
          <MenuItem key={tag.id} value={tag.id}>
            <Avatar src={tag.icon?.url} sx={{ width: 24, height: 24, mr: 1, fontSize: 14 }}>
              {tag.name.substring(0, 2)}
            </Avatar>
            {tag.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
