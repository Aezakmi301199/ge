/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { CSSProperties, FC, useEffect } from 'react';
import { t } from 'i18next';
import { Controller, useFormContext } from 'react-hook-form';
import JumboInputWithAdornment from '../../../shared/input/jumbo-input-with-adornment';
import { NumericFormat } from 'react-number-format';
import { validateNumericMaxValue, validateNumericZeroValue } from '../../../shared/input/number-input';
import { HeadlineTypography_6 } from '../../../shared/typography/ui/ui';
import { theme } from '../../../theme';
import { SxProps } from '@mui/material';
import { ContainerBlock } from '../../../shared/ui-kit/styled';
import { Currency, CurrencyResponse } from '../../../shared/api/generated-api/api.schemas';
import { observer } from 'mobx-react-lite';

interface ControlledFinancialStatusBlockProps {
  sx?: SxProps;
  currency: CurrencyResponse | null;
}

const ControlledPriceBlock: FC<ControlledFinancialStatusBlockProps> = ({ sx, currency }) => {
  const { control, setValue, getValues } = useFormContext();
  const maxPriceValue = 9999999999999;
  return (
    <Controller
      name={'price'}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <ContainerBlock sx={sx}>
            <HeadlineTypography_6 pb={'7px'}>{t('Price')}</HeadlineTypography_6>
            <NumericFormat
              isAllowed={(events) => validateNumericMaxValue(events, maxPriceValue) && validateNumericZeroValue(events)}
              allowNegative={false}
              decimalScale={0}
              disabled={false}
              error={!!error}
              helperText={t('This field is required')}
              value={value}
              onValueChange={(e) => {
                onChange(e.floatValue ?? null);
              }}
              thousandSeparator={' '}
              autoComplete={'off'}
              id='jumbo-input-price'
              text={currency ? currency.isoLetters : ''}
              position={'end'}
              className={'left'}
              sx={{
                width: '300px',
                '&>.MuiInputBase-root': {
                  height: '64px',
                  '&>.MuiInputBase-input': {
                    padding: '16px 14px',
                  },
                },
              }}
              customInput={JumboInputWithAdornment}
              endAdornmentProps={{
                sx: {
                  '&>p': {
                    fontSize: '24px',
                    color: theme.text.disabled,
                  },
                },
              }}
            />
          </ContainerBlock>
        );
      }}
    />
  );
};

export default observer(ControlledPriceBlock);
