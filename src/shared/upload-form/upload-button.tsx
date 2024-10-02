import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import { VisuallyHiddenInput } from '../ui-kit/styled';
import { t } from 'i18next';
import { UploadPhotosComponent } from '../button/ui/ui';
import { observer } from 'mobx-react-lite';
import { BodyTypography_2 } from '../typography/ui/ui';
import { theme } from '../../theme';

interface UploadButtonProps {
  text?: string;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon: ReactNode;
  children: ReactNode;
  inputRef?: React.RefObject<HTMLInputElement>;
  allowedTypes?: string[];
}

const generateAcceptString = (values: string[]) => {
  let acceptString = '';

  values.forEach((extension) => {
    if (extension.includes('*')) {
      acceptString += `${extension}, `;
    }

    acceptString += `.${extension}, `;
  });

  return acceptString.slice(0, -2); // Удаляем последний запятый и пробел
};

const UploadButton: React.FC<UploadButtonProps> = ({
  text = '',
  handleFileChange,
  icon,
  children,
  inputRef,
  allowedTypes,
}) => {
  const accept = allowedTypes ? generateAcceptString(allowedTypes) : '*';

  return (
    <Box sx={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {children}
      <UploadPhotosComponent
        sx={{
          gap: theme.base.module[1],
          padding: theme.base.module['0_5'],
        }}
        component='label'
        variant='contained'
        tabIndex={-1}
      >
        {icon}
        <Box display={'flex'} justifyContent={'center'} position={'relative'} height={'20px'} width={'100%'}>
          <BodyTypography_2
            sx={{
              color: theme.base.primary.main,
              textAlign: 'center',
              whiteSpace: 'normal',
              position: 'absolute',
            }}
          >
            {' '}
            {t(text)}
          </BodyTypography_2>
        </Box>
        <VisuallyHiddenInput type='file' ref={inputRef} onChange={handleFileChange} multiple accept={accept} />
      </UploadPhotosComponent>
    </Box>
  );
};

export default observer(UploadButton);
