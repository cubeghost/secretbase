import { useMemo } from 'react';
import Select, { mergeStyles } from 'react-select';
import type { Theme, StylesConfig, Props, GroupBase } from 'react-select';

import { GRID_SIZE } from '../constants';

const theme = (theme: Theme) => ({
  ...theme,
  spacing: {
    ...theme.spacing,
    baseUnit: 2,
    menuGutter: 6,
    controlHeight: GRID_SIZE,
  }
});

function getStyles<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(): StylesConfig<Option, IsMulti, Group> {
  return {
    container: (baseStyles) => ({
      ...baseStyles,
      flex: '1',
      maxWidth: '220px',
    }),
    valueContainer: (baseStyles) => ({
      ...baseStyles,
      paddingLeft: `${8}px`,
    }),
    option: (baseStyles, { theme: { spacing } }) => ({
      ...baseStyles,
      paddingLeft: `${8 + spacing.baseUnit}px`
    }),
  };
}

function StyledSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  const selectStyles = useMemo(() => getStyles<Option, IsMulti, Group>(), []);
  return (
    <Select theme={theme} styles={mergeStyles(selectStyles, props.styles)} {...props} />
  );
}

export default StyledSelect;