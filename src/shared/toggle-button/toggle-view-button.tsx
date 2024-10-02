import React, { useEffect, useState } from 'react';
import { ChipContainer } from '../../widgets/drawers/ui/ui';
import { t } from 'i18next';
import { View } from '../interfaces/view';
import { observer } from 'mobx-react-lite';
import DeleteIcon from '../../assets/icons/ui-actions/delete/delete-icon';
import { ToggleChip } from '../chip/toggle-chip/toggle-chip';
import { action, makeAutoObservable, observable } from 'mobx';

interface ViewsChipProps {
  views: View[];
  value: string[];
  onToggle?: (views: string[]) => void;
  willSelect: boolean;
}

export class ToggleAmenitiesButtonStore {
  @observable values: string[] = [];
  @observable views: View[] = [];

  constructor(values: string[], views: View[]) {
    if (Array.isArray(views)) {
      this.views = views;
      this.values = values;
    }
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  @action
  onToggle = (newView: View) => {
    const index = this.values.indexOf(newView.id);
    if (index !== -1) {
      this.values.splice(index, 1);
    } else {
      this.values.push(newView.id);
    }
  };

  get getPrimitiveValue() {
    return this.selectedViews.map((val) => val.id);
  }

  @action
  hasSelected(amenityId: string) {
    return this.values.indexOf(amenityId) !== -1;
  }

  @action
  findVIewsByValueString = (value: string[]) => {
    return this.views.filter((view) => value.includes(view.id));
  };

  @action
  setViews(views: View[]) {
    return (this.views = views);
  }

  @action
  setValues(values: string[]) {
    return (this.values = values);
  }

  get selectedViews() {
    return this.findVIewsByValueString(this.values);
  }
}

const ToggleViewButton: React.FC<ViewsChipProps> = ({ views, willSelect, value = [], onToggle }) => {
  const [toggleViewsButtonStore] = useState(() => new ToggleAmenitiesButtonStore(value, views));
  const handleToggleSelect = (viewName: View) => {
    toggleViewsButtonStore.onToggle(viewName);
    onToggle && onToggle(toggleViewsButtonStore.getPrimitiveValue);
  };

  useEffect(() => {
    toggleViewsButtonStore.setValues(value);
  }, [value.length, views.length]);

  return (
    <ChipContainer>
      {views.map((view) => (
        <ToggleChip
          key={view.id}
          checked={toggleViewsButtonStore.hasSelected(view.id)}
          willSelect={true}
          label={t(view.name)}
          onClick={() => (willSelect ? handleToggleSelect(view) : undefined)}
          onDelete={toggleViewsButtonStore.hasSelected(view.id) ? () => handleToggleSelect(view) : undefined}
          deleteIcon={<DeleteIcon />}
          name={view.name}
        />
      ))}
    </ChipContainer>
  );
};

export default observer(ToggleViewButton);
