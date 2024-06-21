import React, { useCallback, useMemo } from 'react';
import type { SingleValue } from 'react-select';

import { BASES } from '../constants';
import type { BaseType, BaseId } from '../types';
import StyledSelect from './Select';

interface BasePickerProps {
  value: BaseId;
  onChange: (value: BaseId) => void;
}

interface BaseOptionType {
  value: BaseId;
  label: string;
  type: BaseType;
}

const BASE_OPTIONS = BASES.map((base) => ({
  value: base.id,
  label: base.label,
  type: base.type
}));

const BaseTypeIcon = ({ type }: { type: BaseType }) => <img src={`/assets/bases/icon_${type}.png`} width={16} />

const formatOptionLabel = (data: BaseOptionType) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    <BaseTypeIcon type={data.type} />
    <span>{data.label}</span>
  </div>
);

const BasePicker = ({ value, onChange }: BasePickerProps) => {
  const option = useMemo(() => (
    BASE_OPTIONS.find((option) => option.value === value)
  ), [value]);

  const handleChange = useCallback((newValue: SingleValue<BaseOptionType>) => {
    onChange(newValue!.value);
  }, [onChange]);

  return (
    <StyledSelect<BaseOptionType>
      options={BASE_OPTIONS}
      value={option}
      onChange={handleChange}
      formatOptionLabel={formatOptionLabel}
    />
  )
}

const MemoizedBasePicker = React.memo(BasePicker);
export default MemoizedBasePicker;