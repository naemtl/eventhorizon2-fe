interface FilterAndSearchProps {
  keyword: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  setKeyword: (keyword: string) => void;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  sources: string[];
  setSources: (sources: string[]) => void;
}

export type { FilterAndSearchProps };
