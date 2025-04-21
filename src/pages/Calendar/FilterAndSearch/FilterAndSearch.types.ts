interface FilterAndSearchProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  sources: string[];
  setSources: (sources: string[]) => void;
}

export type { FilterAndSearchProps };
