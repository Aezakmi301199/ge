import React, { useRef } from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { environments } from '../../environment';
import { CardImage, CardImageContainer } from './ui/ui';
import image from '../../assets/images/no-image-small.svg';
import { PropertyAttachment } from '../api/generated-api/api.schemas';

interface PropertyImageSliderProps {
  attachments: PropertyAttachment[];
}

const PropertyImageSlider: React.FC<PropertyImageSliderProps> = ({ attachments }) => {
  const settings = {
    infinite: attachments.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
  };
  const sliderRef = useRef<Slider | null>(null);

  const handleSliderNext = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handleSliderPrev = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <Box position='relative'>
      <Slider {...settings} ref={sliderRef}>
        {!attachments.length && <CardImage src={image} alt={''} />}
        {attachments.map((attachment) => {
          return (
            <CardImageContainer key={attachment.id}>
              <CardImage src={environments.VITE_ESOFT_CDN + attachment.url} alt={''} />
            </CardImageContainer>
          );
        })}
      </Slider>
      <Box display={attachments.length > 1 ? 'block' : 'none'}>
        <ChevronLeft className='slider-arrow slider-arrow-left' onClick={(event) => handleSliderPrev(event)} />
        <ChevronRight className='slider-arrow slider-arrow-right' onClick={(event) => handleSliderNext(event)} />
      </Box>
    </Box>
  );
};

export default PropertyImageSlider;
