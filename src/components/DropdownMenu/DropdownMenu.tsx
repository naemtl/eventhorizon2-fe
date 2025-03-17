import type { DropdownMenuProps } from './DropdownMenu.types.ts';
import Select from 'react-select';

function DropdownMenu({ isMulti = false, onChange, options, placeholder, value }: DropdownMenuProps) {
  return (
    <Select
      isClearable
      isMulti={isMulti}
      options={options}
      placeholder={placeholder}
      isSearchable={false}
      onChange={onChange}
      value={value}
      styles={{
        control: baseStyles => ({
          ...baseStyles,
          'backgroundColor': 'var(--black)',
          'border': 'none',
          'borderBottom': '1px solid var(--white)',
          'borderColor': 'none',
          'borderRadius': '0',
          'boxShadow': 'none',
          'cursor': 'pointer',
          'fontSize': 'var(--text-xs)',
          '&:hover': {
            borderColor: 'var(--white)',
          },
          '& > div:first-of-type': {
            padding: '2px',
          },
        }),
        menu: baseStyles => ({
          ...baseStyles,
          backgroundColor: 'var(--black)',
          border: '1px solid var(--white)',
          borderRadius: '5px',
        }),
        multiValue: baseStyles => ({
          ...baseStyles,
          '[role=\'button\']': {
            color: 'var(--black)',
          },
          '[role=\'button\']:hover': {
            backgroundColor: 'var(--satan)',
            color: 'var(--white)',
          },
        }),
        placeholder: baseStyles => ({
          ...baseStyles,
          margin: 0,
        }),
        option: baseStyles => ({
          ...baseStyles,
          'backgroundColor': 'var(--black)',
          'cursor': 'pointer',
          'fontSize': 'var(--text-xs)',
          'marginBottom': 'var(--space-xxs)',
          'padding': 'var(--space-xxs) var(--space-xs)',
          '&:hover': {
            backgroundColor: 'var(--white)',
            color: 'var(--black)',
          },
        }),
        singleValue: baseStyles => ({
          ...baseStyles,
          color: 'var(--white)',
        }),
      }}
    />
  );
}

export default DropdownMenu;
