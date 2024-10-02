import React, { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import { ActionTypes } from '../../../shared/enums/action-types.enum';
import { theme } from '../../../theme';
import { BodyTypography_1 } from '../../../shared/typography/ui/ui';
import { t } from 'i18next';
import PropertyShowRequested from './property-show-requested';
import { useRootStore } from '../../../provider/use-root-store';
import { OutlinedWhiteButton } from '../../../shared/button/ui/ui';
import PropertyFieldsUpdate from './property-fields-update';
import { PropertyActionHistoryResponse } from '../../../shared/api/generated-api/api.schemas';
import { observer } from 'mobx-react-lite';
import TransactionPropertySelector from '../../new-property-draft/ui/transaction-property-selector';
import TransactionChip from '../../../shared/chip/transaction-chip';
import PublishedComponent from './published-component';

interface PropertyHistorySectionProps {
  id: string | undefined;
}

const PropertyHistorySection: React.FC<PropertyHistorySectionProps> = observer(({ id }) => {
  const [page, setPage] = useState<number>(1);
  const { historyStore } = useRootStore();

  useEffect(() => {
    if (page < 2) {
      historyStore.fetchPropertyHistoryCount(id);
    }

    historyStore.fetchPropertyHistory(id, page);
  }, [page]);

  const renderers = {
    [ActionTypes.PROPERTY_UPDATED]: (data: PropertyActionHistoryResponse) => <PropertyFieldsUpdate history={data} />,
    [ActionTypes.PUBLICATION_STATUS]: (data: PropertyActionHistoryResponse) => <PropertyFieldsUpdate history={data} />,
    [ActionTypes.STATUS_CHANGED]: (data: PropertyActionHistoryResponse) => <PropertyFieldsUpdate history={data} />,
    [ActionTypes.PRICE_CHANGED]: (data: PropertyActionHistoryResponse) => (
      <PropertyFieldsUpdate history={data} isPriceChanged />
    ),
    [ActionTypes.SHOW_REQUESTED]: (data: PropertyActionHistoryResponse) => <PropertyShowRequested history={data} />,
    [ActionTypes.PUBLICATION_REQUESTED]: (data: PropertyActionHistoryResponse) => <PublishedComponent history={data} />,
    [ActionTypes.RESPONSIBLE_CHANGED]: (data: PropertyActionHistoryResponse) => <PropertyFieldsUpdate history={data} />,
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(Number(historyStore.count.count) / itemsPerPage);
  const hasMore = page < totalPages;
  const historyTypes = [
    {
      name: 'All',
      value: 'All',
    },
    {
      name: 'Price',
      value: 'Price',
    },
    {
      name: 'Responsible',
      value: 'Responsible',
    },
    {
      name: 'Shows',
      value: 'Shows',
    },
    {
      name: 'Publication',
      value: 'Publication',
    },
    {
      name: 'Other',
      value: 'Other',
    },
  ];

  return (
    <Stack gap={theme.gap.gap_xl} sx={{ backgroundColor: 'white' }}>
      <TransactionPropertySelector>
        {({ state, toggleHistoryType }) => (
          <Stack>
            <TransactionChip
              items={historyTypes}
              selectedItem={state.historyType}
              onSelectItem={toggleHistoryType}
              label=''
              sx={{
                borderRadius: '30px',
                fontWeight: 400,
                height: '36px',
                '.MuiChip-label': {
                  padding: '0 14px',
                },
              }}
            />
          </Stack>
        )}
      </TransactionPropertySelector>
      <Stack
        gap={theme.gap.gap_4xl}
        sx={{
          minHeight: 'auto',
          maxHeight: '470px',
          overflowY: 'auto',
        }}
      >
        {historyStore.history.length ? (
          <>
            {historyStore.history.map((change, index) => {
              const renderChange = renderers[change.actionType as keyof typeof renderers];

              if (change.data.key === 'typeFields') {
                return;
              }
              return <Box key={index}>{renderChange ? renderChange(change) : null}</Box>;
            })}
            {hasMore && !historyStore.isLoading && (
              <OutlinedWhiteButton
                sx={{ backgroundColor: theme.base.default.main.button, border: 'none' }}
                onClick={() => setPage((prev) => prev + 1)}
                disabled={historyStore.isLoading}
              >
                {t('Show 10 more')}
              </OutlinedWhiteButton>
            )}
          </>
        ) : (
          <BodyTypography_1 sx={{ color: theme.text.secondary }}>{t('No changes')}</BodyTypography_1>
        )}
      </Stack>
    </Stack>
  );
});

export default PropertyHistorySection;
