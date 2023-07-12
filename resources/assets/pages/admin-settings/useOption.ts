import axios from 'axios';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import Option from '../../types/models/Option';

export default function useOption(key: string) {
  const { data, reload } = useFetch<Option>(`/admin/options/${key}`);
  const value = data?.value;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = (newValue: any) => {
    setSaving(true);
    if (data) {
      axios
        .put(`/admin/options/${key}`, { value: newValue })
        .then(() => {
          reload();
        })
        .catch((e) => {
          setError(e.res?.data?.errors?.[0]?.message || 'Error');
        })
        .finally(() => {
          setSaving(false);
        });
    } else {
      axios
        .post(`/admin/options`, { key, value: newValue })
        .then(() => {
          reload();
        })
        .catch((e) => {
          setError(e.res?.data?.errors?.[0]?.message || 'Error');
        })
        .finally(() => {
          setSaving(false);
        });
    }
  };

  return { value, save, saving, error };
}
