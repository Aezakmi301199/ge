import { FC } from 'react';
import ControlledConfigAreaProperty from './controlled-config-area-property/controlled-config-area-property';

type ControlledPlotSizeBlockProps = {
  minValue?: number;
  maxValue?: number;
  required: boolean;
  onChangeConvertedValue: (value: number | undefined) => void;
};

export const ControlledPlotSizeBlock: FC<ControlledPlotSizeBlockProps> = ({
  maxValue = 200000,
  required,
  onChangeConvertedValue,
}) => {
  return (
    <ControlledConfigAreaProperty
      maxValue={maxValue}
      onChangeConvertedValue={onChangeConvertedValue}
      required={required}
      name={'typeFields.plotSize'}
      label={'Plot Size'}
    />
  );
};
