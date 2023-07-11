import axios from 'axios';
import Image from '../../types/models/Image';

export interface ImageUploadProps {
  width?: number;
  height?: number;
  fit?: 'contain' | 'cover';
  onUpload?: () => void;
  onChange?: (image: Image) => void;
  onFail?: (err: any) => void;
}

export default function ImageUpload({
  width,
  height,
  fit,
  onUpload,
  onChange,
  onFail,
}: ImageUploadProps) {
  return (
    <input
      type="file"
      accept="*.jpg,*.png,*.gif,*.webp"
      hidden
      onChange={(e) => {
        onUpload?.();
        const file = e.target.files?.[0];
        if (file) {
          const data = new FormData();
          data.append('file', file);
          if (width) {
            data.append('width', String(width));
          }
          if (height) {
            data.append('height', String(height));
          }
          if (fit) {
            data.append('fit', fit);
          }
          axios
            .post<Image>('/images', data)
            .then((res) => {
              onChange?.(res.data);
            })
            .catch((err) => {
              onFail?.(err);
            });
        }
      }}
    />
  );
}
