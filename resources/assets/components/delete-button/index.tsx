import { Delete } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button, ButtonProps, Dialog, DialogActions, DialogTitle } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface DeleteButtonProps extends ButtonProps {
  url: string;
  onSucceed?: () => void;
  onFail?: () => void;
}

export default function DeleteButton({ url, onSucceed, onFail, ...props }: DeleteButtonProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  return (
    <LoadingButton
      {...props}
      loading={deleting}
      color="error"
      startIcon={<Delete />}
      onClick={() => {
        setOpen(true);
      }}
    >
      {t('Delete')}
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle>{t('Delete confirm')}</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              setDeleting(true);
              axios
                .delete(url)
                .then(onSucceed)
                .catch(onFail)
                .finally(() => {
                  setDeleting(false);
                });
            }}
          >
            {t('OK')}
          </Button>
          <Button>{t('Cancel')}</Button>
        </DialogActions>
      </Dialog>
    </LoadingButton>
  );
}
