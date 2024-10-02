import React, { useState } from 'react';
import { IconButton, SelectChangeEvent, Stack } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import FileUpload from './file-uploader';
import { theme } from '../../theme';
import { t } from 'i18next';
import { BodyTypography_1, HeadlineTypography_6 } from '../../shared/typography/ui/ui';
import Select from '../../shared/select/select';
import { observer } from 'mobx-react-lite';
import { DocumentFile } from './document-upload-container';

interface option {
  name: string;
  value: string;
}

interface DocumentUploadProps {
  document: DocumentFile;
  onRemove: (key: string) => void;
  showLabel?: boolean;
  options?: option[];
  valueSelect: string | undefined;
  onSelect?: (value: string | undefined) => void;
  error?: boolean;
  innerRef: any;
}

const DocumentView: React.FC<DocumentUploadProps> = ({
  document,
  onRemove,
  showLabel = true,
  options = [],
  valueSelect = '',
  onSelect,
  error,
  innerRef,
  ...otherProps
}) => {
  const handleSelect = (event: SelectChangeEvent<string>) => {
    onSelect && onSelect(event.target.value);
  };

  console.log(valueSelect);
  return (
    <Stack ref={innerRef} {...otherProps}>
      {showLabel && <HeadlineTypography_6 sx={{ padding: '8px' }}>{t(document.label)}</HeadlineTypography_6>}
      {document.file && (
        <Stack
          gap={theme.base.module[2]}
          borderBottom={theme.border.default}
          padding={`${theme.base.module[1]} 0px`}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Stack
            maxWidth={'70%'}
            direction='row'
            padding={`${theme.base.module[1]} 0px`}
            gap={'10px'}
            alignItems='center'
          >
            <BodyTypography_1
              sx={{
                color: '#000000',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {document.file.name}
            </BodyTypography_1>
          </Stack>
          <Stack flexDirection={'row'} gap={theme.base.module['0_5']}>
            <Select
              sx={{
                width: '179px',
                height: '40px',
              }}
              id={valueSelect}
              value={valueSelect}
              onChange={handleSelect}
              size='small'
              error={error}
              options={options}
            />
            <IconButton onClick={() => onRemove(document.key)}>
              <CloseRounded sx={{ color: theme.action.active }} />
            </IconButton>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default observer(DocumentView);
