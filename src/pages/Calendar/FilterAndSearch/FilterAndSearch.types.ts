interface FilterAndSearchProps {
  keyword: string;
  startDate: Date | null;
  endDate: Date | null;
  setKeyword: (keyword: string) => void;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  sources: string[];
  setSources: (sources: string[]) => void;
}

export type { FilterAndSearchProps };
