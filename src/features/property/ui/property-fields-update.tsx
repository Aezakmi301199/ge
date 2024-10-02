import React from 'react';
import { theme } from '../../../theme';
import { Stack } from '@mui/material';
import { BodyTypography_1 } from '../../../shared/typography/ui/ui';
import { renderValue } from '../../../shared/lib/render-value';
import { separateThousand } from '../../../shared/lib/separate-thousand';
import TimeAndNameOfHistory from './time-and-name-of-history';
import DescriptionUpdated from './description-updated';
import AmenityUpdated from './amenity-updated';
import { HistoryTypography } from './ui';
import FinancialAndFurnishedComponent from './financial-and-furnished-component';
import StatusComponent from './status-component';
import ViewComponent from './view-component';
import DistrictComponent from './district-component';
import BalconyComponent from './balcony-component';
import MaidRoomComponentComponent from './maid-room-component-component';
import BuildingComponent from './building-component';
import { PropertyActionHistoryResponse } from '../../../shared/api/generated-api/api.schemas';
import ResponsibleComponent from './responsible-component';
import DraftComponent from './draft-component';
import { isResponsibleChangedHistory } from '../../../shared/type-guards/responsible';
import { isPropertyHistoryView } from '../../../shared/type-guards/view';
import { isPropertyHistoryBuilding } from '../../../shared/type-guards/building';
import PublishedComponent from './published-component';
import CurrencyComponent from './currency-component';
import ActionKey from './action-key';

interface PropertyFieldsUpdateProps {
  history: PropertyActionHistoryResponse;
  isPriceChanged?: boolean;
}

interface PropertyFieldsUpdateProps {
  history: PropertyActionHistoryResponse;
  isPriceChanged?: boolean;
}

const PropertyFieldsUpdate: React.FC<PropertyFieldsUpdateProps> = ({ history, isPriceChanged }) => {
  if (isPropertyHistoryView(history)) {
    return <ViewComponent history={history} />;
  }

  if (isResponsibleChangedHistory(history)) {
    return <ResponsibleComponent history={history} />;
  }

  if (
    history.data.key.includes('Amenity') &&
    Array.isArray(history.data.oldValue) &&
    Array.isArray(history.data.newValue)
  ) {
    return <AmenityUpdated history={history} />;
  }

  if (history.data.key.includes('description')) {
    return <DescriptionUpdated history={history} />;
  }

  if (history.data.key.includes('Draft')) {
    return <DraftComponent history={history} />;
  }

  if (history.data.key.includes('published')) {
    return <PublishedComponent history={history} />;
  }

  if (history.data.key.includes('currency')) {
    return <CurrencyComponent history={history} />;
  }

  if (history.data.key.includes('status')) {
    return <StatusComponent history={history} />;
  }

  if (history.data.key.includes('financialStatus')) {
    return <FinancialAndFurnishedComponent history={history} />;
  }

  if (history.data.key.includes('furnishingType')) {
    return <FinancialAndFurnishedComponent history={history} />;
  }

  if (history.data.key.includes('district')) {
    return <DistrictComponent history={history} />;
  }

  if (history.data.key.includes('hasBalcony')) {
    return <BalconyComponent history={history} />;
  }

  if (history.data.key.includes('hasMaidRoom')) {
    return <MaidRoomComponentComponent history={history} />;
  }

  if (isPropertyHistoryBuilding(history)) {
    return <BuildingComponent history={history} />;
  }

  return (
    <Stack gap={theme.gap.gap_md}>
      <TimeAndNameOfHistory history={history} />
      <HistoryTypography>
        <ActionKey actionKey={history.data.key} />
        {!isPriceChanged ? (
          <>
            <BodyTypography_1>{renderValue(history.data.oldValue)}</BodyTypography_1>
            <BodyTypography_1>→</BodyTypography_1>
            <BodyTypography_1>{renderValue(history.data.newValue)}</BodyTypography_1>
          </>
        ) : (
          <>
            <BodyTypography_1>{separateThousand(renderValue(history.data.oldValue))}</BodyTypography_1>
            <BodyTypography_1>→</BodyTypography_1>
            <BodyTypography_1>{separateThousand(renderValue(history.data.newValue))}</BodyTypography_1>
          </>
        )}
      </HistoryTypography>
    </Stack>
  );
};

export default PropertyFieldsUpdate;
