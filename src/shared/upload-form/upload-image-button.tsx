import React, { ReactNode, useRef, useState } from 'react';
import { FormHelperText, Grid, Stack } from '@mui/material';
import UploadButton from './upload-button';
import { observer } from 'mobx-react-lite';
import { t } from 'i18next';
import AddAPhotoIcon from '../../assets/icons/photo-image/add_a_photo/add-a-photo.icon';
import { theme } from '../../theme';
import { ActionButtonContainer, ActionContainer, ImageUploadContainer, UploadImageContent } from '../ui-kit/styled';
import { CloseRounded } from '@mui/icons-material';

interface UploadImageButtonProps {
  text?: string;
  helperText?: string;
  icon?: ReactNode;
  allowedTypes?: string[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface refImageData {
  files?: FileList | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
enum ImageTypeBase64 {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  GIF = 'image/gif',
  SVG = 'image/svg+xml',
  BMP = 'image/bmp',
  TIFF = 'image/tiff',
  WEBP = 'image/webp',
  HEIC = 'image/heic',
  ICO = 'image/x-icon',
  PDF = 'application/pdf',
  PS = 'application/postscript',
  EPS = 'application/eps',
  AI = 'application/illustrator',
  RAW = 'image/raw',
  DDS = 'image/dds',
  CR2 = 'image/cr2',
  NEF = 'image/nef',
  ORF = 'image/orf',
  ARW = 'image/arw',
  RW2 = 'image/rw2',
  CR3 = 'image/cr3',
  MRW = 'image/mrw',
  DNG = 'image/dng',
  PEF = 'image/pef',
  X3F = 'image/x3f',
  MOS = 'image/mos',
  KDC = 'image/kdc',
  SRW = 'image/srw',
  ERF = 'image/erf',
  MEF = 'image/mef',
  CUR = 'image/vnd.ms-icon',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
enum ImageType {
  JPEG = 'JPEG',
  PNG = 'PNG',
  GIF = 'GIF',
  SVG = 'SVG',
  BMP = 'BMP',
  TIFF = 'TIFF',
  WEBP = 'WEBP',
  HEIC = 'HEIC',
  ICO = 'ICO',
  PDF = 'PDF',
  PS = 'PS',
  EPS = 'EPS',
  AI = 'AI',
  RAW = 'RAW',
  DDS = 'DDS',
  CR2 = 'CR2',
  NEF = 'NEF',
  ORF = 'ORF',
  ARW = 'ARW',
  RW2 = 'RW2',
  CR3 = 'CR3',
  MRW = 'MRW',
  DNG = 'DNG',
  PEF = 'PEF',
  X3F = 'X3F',
  MOS = 'MOS',
  KDC = 'KDC',
  SRW = 'SRW',
  ERF = 'ERF',
  MEF = 'MEF',
  CUR = 'CUR',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
enum LowerCaseImageType {
  JPEG = 'jpeg',
  PNG = 'png',
  GIF = 'gif',
  SVG = 'svg',
  BMP = 'bmp',
  TIFF = 'tiff',
  WEBP = 'webp',
  HEIC = 'heic',
  ICO = 'ico',
  PDF = 'pdf',
  PS = 'ps',
  EPS = 'eps',
  AI = 'ai',
  RAW = 'raw',
  DDS = 'dds',
  CR2 = 'cr2',
  NEF = 'nef',
  ORF = 'orf',
  ARW = 'arw',
  RW2 = 'rw2',
  CR3 = 'cr3',
  MRW = 'mrw',
  DNG = 'dng',
  PEF = 'pef',
  X3F = 'x3f',
  MOS = 'mos',
  KDC = 'kdc',
  SRW = 'srw',
  ERF = 'erf',
  MEF = 'mef',
  CUR = 'cur',
}

interface imageData {
  name: string;
  base64: string;
}

const UploadImageButton: React.FC<UploadImageButtonProps> = ({
  text = 'Add photos',
  helperText,
  icon,
  allowedTypes = ['image/*'],
}) => {
  const [selectedImages, setSelectedImages] = useState<imageData[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const newImages = await Promise.all(
        Array.from(files).map(async (file) => {
          const value = await new Promise<{ base64: string; name: string }>((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
              resolve({
                base64: String(reader.result),
                name: file.name,
              });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });

          return value;
        }),
      );

      setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleDeleteImage = (imageName: string) => {
    const pseudoArrayFiles = ref.current?.files; // FileList - псевдо-массив

    if (!pseudoArrayFiles) {
      return;
    }

    const arrayFiles = Array.from(pseudoArrayFiles);

    const filteredImageFiles = arrayFiles.filter((img) => img.name !== imageName);
    const filteredImages = selectedImages.filter((img) => img.name !== imageName);
    // Создаем коллекцию файлов:
    const dt = new DataTransfer();

    filteredImageFiles.forEach((image) => dt.items.add(image));

    // Устанавливаем files на новый FileList, полученный из filteredFiles
    ref.current.files = dt.files;

    setSelectedImages(filteredImages);
  };

  return (
    <Stack gap={theme.base.module[1]}>
      <UploadButton
        text={text}
        handleFileChange={handleFileChange}
        icon={icon ?? <AddAPhotoIcon />}
        inputRef={ref}
        allowedTypes={allowedTypes}
        children={selectedImages.map((image, index) => (
          <Grid item key={index}>
            <ImageUploadContainer>
              <UploadImageContent src={image.base64} alt={''} />
              <ActionContainer>
                <ActionButtonContainer onClick={() => handleDeleteImage(image.name)}>
                  <CloseRounded fontSize={'small'} sx={{ color: theme.bg.button.white.default }} />
                </ActionButtonContainer>
              </ActionContainer>
            </ImageUploadContainer>
          </Grid>
        ))}
      />
      {helperText && <FormHelperText sx={{ paddingTop: '3px' }}>{t(helperText)}</FormHelperText>}
    </Stack>
  );
};

export default observer(UploadImageButton);
