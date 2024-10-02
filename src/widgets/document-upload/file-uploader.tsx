import React, { ReactNode } from 'react';
import { useDropzone } from 'react-dropzone';
import { t } from 'i18next';
import { UploadDocsComponent } from '../../shared/button/ui/ui';
import { observer } from 'mobx-react-lite';
import { Stack, SxProps } from '@mui/material';

interface FileUploadProps {
  onDrop: (acceptedFiles: File[]) => void;
  sx?: SxProps;
  renderFiles: any;
}

const FileUpload: React.FC<FileUploadProps> = ({ onDrop, sx, renderFiles }) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: {
      'application/pdf': ['.pdf'],
    },
  });

  return (
    <Stack gap='20px'>
      {renderFiles()}
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <UploadDocsComponent size='large' onClick={open}>
          {t('Upload')}
        </UploadDocsComponent>
      </div>
    </Stack>
  );
};

export default observer(FileUpload);
