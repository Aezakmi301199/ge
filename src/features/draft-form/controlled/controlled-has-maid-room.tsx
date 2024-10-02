import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import FormControlLabel from '../../../shared/label/form-control-label';
import Switch from '../../../shared/switch/switch';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';

const ControlledHasMaidRoom = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name={'typeFields.hasMaidRoom'}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <FormControlLabel
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexGrow: '1',
            }}
            control={
              <Switch
                checked={value}
                onChange={(e) => {
                  onChange(e.target.checked);
                }}
              />
            }
            label={t("Maid's")}
            labelPlacement={'start'}
            gutterBottom={false}
          />
        );
      }}
    />
  );
};

export default observer(ControlledHasMaidRoom);
