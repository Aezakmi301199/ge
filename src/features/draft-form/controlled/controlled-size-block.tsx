import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import ControlledConfigAreaProperty from './controlled-config-area-property/controlled-config-area-property';

interface ControlledSizeBlockProps {
  minValue?: number;
  maxValue?: number;
  required: boolean;
  onChangeConvertedValue: (value: number | undefined) => void;
}

const ControlledSizeBlock: FC<ControlledSizeBlockProps> = ({ maxValue = 200000, required, onChangeConvertedValue }) => {
  return (
    <ControlledConfigAreaProperty
      onChangeConvertedValue={onChangeConvertedValue}
      maxValue={maxValue}
      required={required}
      name={'typeFields.size'}
      label={'Property size'}
    />
  );
};

export default observer(ControlledSizeBlock);
