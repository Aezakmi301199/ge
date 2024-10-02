import React, { FC } from 'react';
import TextInput from './text-input';
import { t } from 'i18next';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { toCapitalize } from '../interfaces/base-property-form.interface';
import { observer } from 'mobx-react-lite';
import { match } from 'ts-pattern';
import { Box, SxProps, Typography } from '@mui/material';
import { ErrorTypography } from '../ui-kit/styled';

type AllowedValuesNumericFormat = {
  formattedValue: string;
  value: string;
  floatValue: number | undefined;
};

export const validateNumericMaxValue = (values: AllowedValuesNumericFormat, maxValue: number | undefined) => {
  if (!values.floatValue || !maxValue) {
    return true;
  }
  return values.floatValue <= maxValue;
};

export const validateNumericMinValue = (values: AllowedValuesNumericFormat, minValue: number | undefined) => {
  if (!values.floatValue || !minValue) {
    return true;
  }

  return values.floatValue > minValue;
};

export const validateNumericZeroValue = (values: AllowedValuesNumericFormat) => {
  if (values.floatValue !== 0) {
    return true;
  }

  return false;
};

interface NumberInputProps extends NumericFormatProps {
  error?: boolean;
  helperText?: string;
  onChange: (values: AllowedValuesNumericFormat) => void;
  label: string;
  minValue?: number;
  maxValue?: number;
  showErrorText?: boolean;
  showPromptText?: boolean;
  sx?: SxProps;
}

const NumberInput: FC<NumberInputProps> = ({
  allowNegative,
  helperText,
  onChange,
  label,
  disabled,
  maxValue,
  value,
  required,
  showErrorText = false,
  showPromptText = false,
  error,
  sx,
}) => {
  const translatedLabel = t(toCapitalize(label));
  return (
    <Box width={'100%'}>
      <NumericFormat
        isAllowed={(events) => validateNumericMaxValue(events, maxValue) && validateNumericZeroValue(events)}
        allowNegative={allowNegative}
        decimalScale={0}
        disabled={disabled}
        error={error}
        helperText={'helperText'}
        value={value}
        onValueChange={onChange}
        thousandSeparator={' '}
        autoComplete={'off'}
        id='outlined-start-adornment'
        className={'left'}
        customInput={TextInput}
        required={required}
        label={translatedLabel}
        sx={sx}
      />
      {match({ showPromptText, showErrorText, hasError: Boolean(error) })
        .with({ showPromptText: true }, () => <Typography>{helperText && t(helperText)}</Typography>)
        .with({ showErrorText: true, hasError: true }, () => (
          <ErrorTypography mt={'4px'}>{helperText && t(helperText)}</ErrorTypography>
        ))
        .otherwise(() => null)}
    </Box>
  );
};

export default observer(NumberInput);
