import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { BodyTypography_1, HeadlineTypography_5 } from '../../shared/typography/ui/ui';
import { OutlinedWhiteButton } from '../../shared/button/ui/ui';
import { t } from 'i18next';
import { PropertyResponse } from '../../shared/api/generated-api/api.schemas';
import { AmountLimit } from '../../shared/enums/amount-limit.enum';
import { Screen } from '../../shared/enums/screen.enum';
import { useScreenWidth } from '../../screen-width/hooks/use-screen-width';
import { AmenitiesAndViewContainer } from './ui/ui';

interface ViewListProps {
  propertyViews: Pick<PropertyResponse, 'views'>;
}

const ViewList: React.FC<ViewListProps> = ({ propertyViews }) => {
  const [showAllViews, setShowAllViews] = useState<boolean>(false);
  const screen = useScreenWidth();

  const toggleShowAll = () => {
    setShowAllViews((prevState) => !prevState);
  };

  const visibleViews = showAllViews
    ? propertyViews.views
    : propertyViews.views.slice(AmountLimit.ZERO, AmountLimit.FIVE);

  return (
    <AmenitiesAndViewContainer
      sx={{
        marginTop: screen <= Screen.MOBILE ? '0' : '48px',
      }}
    >
      <HeadlineTypography_5>{t('A view of')}</HeadlineTypography_5>
      {!propertyViews.views.length ? (
        <BodyTypography_1>{t('No data')}</BodyTypography_1>
      ) : (
        <ul>
          <Stack marginLeft={'28px'}>
            {visibleViews.map((viewItem) => (
              <li key={viewItem.view.id}>
                <BodyTypography_1>{t(viewItem.view.name)}</BodyTypography_1>
              </li>
            ))}
          </Stack>
        </ul>
      )}

      {propertyViews.views.length > AmountLimit.TEN && (
        <OutlinedWhiteButton onClick={toggleShowAll}>
          {showAllViews ? t('Show less') : t('Read more')}
        </OutlinedWhiteButton>
      )}
    </AmenitiesAndViewContainer>
  );
};

export default ViewList;
