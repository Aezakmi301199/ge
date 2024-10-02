import React, { useState } from 'react';
import { Box } from '@mui/material';
import { environments } from '../../environment';
import AbsoluteDefaultButton from '../../shared/button/absolute-default-button';
import { theme } from '../../theme';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import { t } from 'i18next';
import noImagePlug from '../../assets/images/no-image-large.svg';
import { observer } from 'mobx-react-lite';
import { PhotoAndMapContainer } from './ui/ui';
import { useScreenWidth } from '../../screen-width/hooks/use-screen-width';
import { Screen } from '../../shared/enums/screen.enum';
import { PropertyAttachment } from '../../shared/api/generated-api/api.schemas';

interface PhotosAndMapProps {
  attachments: PropertyAttachment[] | undefined;
}

const PhotosAndMap: React.FC<PhotosAndMapProps> = observer(({ attachments }) => {
  const images = attachments?.map((attachment) => ({
    src: attachment.domain
      ? `${attachment.domain}${attachment.url}`
      : `${environments.VITE_ESOFT_CDN}${attachment.url}`,
  }));
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const screen = useScreenWidth();

  return (
    <PhotoAndMapContainer>
      <Box sx={{ position: 'relative', '@media (max-width: 430px)': { height: '300px' } }}>
        {!attachments ? (
          <img className={'plug-image'} src={noImagePlug} alt={''} />
        ) : (
          <>
            <img
              onClick={() => setIsSliderOpen(true)}
              className={'property-image'}
              src={attachments.length ? `${environments.VITE_ESOFT_CDN}${attachments[0]?.url}` : noImagePlug}
              alt={''}
            />
            {attachments.length ? (
              <AbsoluteDefaultButton
                text={`${t('Show')} ${attachments.length} ${t('photos')}`}
                onClick={() => setIsSliderOpen(true)}
              />
            ) : null}
          </>
        )}
      </Box>
      {screen > Screen.MOBILE && (
        <Box>
          <img
            style={{ borderRadius: theme.border_radius.modal }}
            width={'300px'}
            height={'450px'}
            src={'https://storage.googleapis.com/pod_public/1300/161853.jpg'}
            alt={''}
          />
        </Box>
      )}
      {isSliderOpen && (
        <Lightbox
          plugins={[Captions, Counter]}
          open={isSliderOpen}
          close={() => setIsSliderOpen(false)}
          slides={images}
          controller={{
            closeOnPullDown: true,
            closeOnPullUp: true,
          }}
          render={{
            slide: ({ ...slide }) => {
              if (slide.slide.src.includes('youtube')) {
                return (
                  <iframe
                    width='80%'
                    height='80%'
                    style={{ border: 'none' }}
                    src={slide.slide.src}
                    referrerPolicy='strict-origin-when-cross-origin'
                    allowFullScreen
                  ></iframe>
                );
              }
            },
          }}
          counter={{
            className: 'counter-of-slides',
            container: {
              style: {
                top: 'unset',
                left: 'unset',
                bottom: '16px',
                backgroundColor: theme.bg.button.dark.default,
                borderRadius: '100px',
                filter: 'none',
                fontSize: '13px',
                padding: '3px',
                margin: '0',
                width: '49px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            },
          }}
        />
      )}
    </PhotoAndMapContainer>
  );
});

export default PhotosAndMap;
