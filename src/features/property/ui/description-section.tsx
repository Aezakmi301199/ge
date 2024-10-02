import React, { useEffect, useState } from 'react';
import { BodyTypography_1, HeadlineTypography_5 } from '../../../shared/typography/ui/ui';
import { t } from 'i18next';
import { Chip, Stack } from '@mui/material';
import { theme } from '../../../theme';
import { Languages } from '../../../shared/enums/languages.enum';
import { useLanguageFromLocalStorage } from '../../../i18n/hooks/use-default-language';
import { OutlinedWhiteButton } from '../../../shared/button/ui/ui';
import { PropertyResponse } from '../../../shared/api/generated-api/api.schemas';
import { Screen } from '../../../shared/enums/screen.enum';
import { useScreenWidth } from '../../../screen-width/hooks/use-screen-width';
import { DescriptionInfoContainer } from './ui';

interface DescriptionSectionProps {
  property: Pick<
    PropertyResponse,
    'views' | 'propertyAmenity' | 'descriptionEN' | 'descriptionRU' | 'typeFields' | 'price'
  >;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ property }) => {
  const defaultLanguage = useLanguageFromLocalStorage();
  const [defaultDescriptionLanguage, setDefaultDescriptionLanguage] = useState<string>(defaultLanguage.toUpperCase());
  const languages = [Languages.EN, Languages.RU];
  const [needFullContent, setNeedFullContent] = useState<boolean>(false);
  const [isTextLong, setIsTextLong] = useState<boolean>(false);
  const visibleDescriptionLength = 375;
  const screen = useScreenWidth();

  useEffect(() => {
    const currentDescription =
      defaultDescriptionLanguage === Languages.RU ? property.descriptionRU : property.descriptionEN;

    if (!currentDescription) {
      return;
    }

    setIsTextLong(currentDescription.length > visibleDescriptionLength);

    setNeedFullContent(false);
  }, [defaultDescriptionLanguage]);

  return (
    <DescriptionInfoContainer
      sx={{
        marginTop: screen <= Screen.MOBILE ? '0' : '48px',
      }}
    >
      <HeadlineTypography_5>{t('Description')}</HeadlineTypography_5>
      <Stack direction={'row'} gap={1}>
        {languages.map((language) => (
          <Chip
            sx={{
              '.MuiChip-label': {
                fontSize: '16px',
              },
              backgroundColor: defaultDescriptionLanguage === language ? theme.base.primary.main : '',
              color: defaultDescriptionLanguage === language ? theme.text.white : theme.text.primary,
              border: defaultDescriptionLanguage === language ? 'none' : theme.border.default,
              boxShadow: 'none',
              height: '36px',
              borderRadius: '100px',
              width: '49px',
              '&:hover': {
                boxShadow: 'none',
                backgroundColor: theme.base.primary.dark,
              },
            }}
            key={language}
            variant={defaultDescriptionLanguage === language ? 'filled' : 'outlined'}
            label={language}
            onClick={() => setDefaultDescriptionLanguage(language)}
          />
        ))}
      </Stack>
      <BodyTypography_1
        sx={{
          whiteSpace: 'wrap',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: needFullContent ? 'auto' : '100px',
        }}
      >
        {defaultDescriptionLanguage === 'RU' ? property.descriptionRU : property.descriptionEN}
      </BodyTypography_1>
      {isTextLong && (
        <OutlinedWhiteButton onClick={() => setNeedFullContent((prevState) => !prevState)}>
          {needFullContent ? t('Read less') : t('Read more')}
        </OutlinedWhiteButton>
      )}
    </DescriptionInfoContainer>
  );
};

export default DescriptionSection;
