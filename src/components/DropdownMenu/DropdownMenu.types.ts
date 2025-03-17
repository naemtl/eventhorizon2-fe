import type { Option } from 'src/types/index.js';

interface DropdownMenuProps {
  isMulti?: boolean;
  onChange: (value: any) => void; // TODO: check type
  options: Array<Option>;
  placeholder: string;
  value?: Array<Option> | Option | null;
}

export type { DropdownMenuProps };
