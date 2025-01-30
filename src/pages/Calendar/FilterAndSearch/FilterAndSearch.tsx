import { memo, useCallback, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import Select from "react-select";

import { format, subDays } from "date-fns";
import { enCA, frCA, es } from "date-fns/locale";
import { useTranslation } from "react-i18next";

import styles from "./FilterAndSearch.module.css";
import "react-datepicker/dist/react-datepicker.css";
import "./Datepicker.css";

interface FilterAndSearchProps {
  setQueryString: (queryString: string) => void;
}

const sources = [
  { value: "askapunk", label: "AskAPunk" },
  { value: "blueskiesturnblack", label: "BSTB" },
  { value: "ravewave", label: "Ravewave" },
  { value: "casadelpopolo", label: "Suoni" },
  { value: "turbohaus", label: "Turbohaus" },
];

function FilterAndSearch({ setQueryString }: FilterAndSearchProps) {
  const { i18n } = useTranslation();

  const [datepickerLocal, setDatepickerLocale] = useState(enCA);
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  useEffect(() => {
    if (i18n.language === "fr") {
      registerLocale("frCA", frCA);
      setDatepickerLocale(frCA);
    } else if (i18n.language === "es") {
      registerLocale("es", es);
      setDatepickerLocale(es);
    } else {
      registerLocale("enCA", enCA);
      setDatepickerLocale(enCA);
    }

    return () => {
      setDatepickerLocale(enCA);
    };
  }, [i18n.language]);

  const handleSubmit = useCallback(() => {
    let queryString = "";

    if (startDate) {
      const formattedStartDate = format(startDate, "yyyy-MM-dd");
      queryString += `start=${formattedStartDate}`;
    }
    if (endDate) {
      const formattedEndDate = format(endDate, "yyyy-MM-dd");
      queryString += `&end=${formattedEndDate}`;
    }
    if (selectedSources.length > 0) {
      queryString += `&source=${selectedSources.join(",")}`;
    }
    if (keyword) {
      queryString += `&keyword=${keyword}`;
    }

    setQueryString(queryString);
    setKeyword("");
    setSelectedSources([]);
    setStartDate(null);
    setEndDate(null);
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.searchContainer}>
        <label className={styles.label} htmlFor="keyword">
          Search by title
        </label>
        <input
          className={styles.input}
          title="Keyword"
          id="keyword"
          type="input"
          placeholder="Enter keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div className={styles.dateContainer}>
        <div className={styles.datePickerContainer}>
          <DatePicker
            aria-label="Start date range"
            locale={datepickerLocal}
            dateFormat="yyyy.MM.dd"
            placeholderText="Start date range"
            selectsStart
            minDate={subDays(new Date(), 1)}
            maxDate={endDate ?? undefined}
            startDate={startDate}
            endDate={endDate}
            onChange={(date) => setStartDate(date)}
            selected={startDate}
          />
        </div>
        <div className={styles.datePickerContainer}>
          <DatePicker
            aria-label="End date range"
            locale={datepickerLocal}
            dateFormat="yyyy.MM.dd"
            placeholderText="End date range"
            selectsEnd
            minDate={new Date()}
            startDate={startDate}
            endDate={endDate}
            onChange={(date) => setEndDate(date)}
            selected={endDate}
          />
        </div>
      </div>
      <div className={styles.selectContainer}>
        <Select
          isMulti
          options={sources}
          placeholder="Filter by source"
          isSearchable={false}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "var(--black)",
              border: "none",
              borderBottom: "1px solid var(--white)",
              borderColor: "none",
              borderRadius: "0",
              boxShadow: "none",
              cursor: "pointer",
              fontSize: "var(--text-xs)",
              "&:hover": {
                borderColor: "var(--white)",
              },
              "& > div:first-of-type": {
                padding: "2px",
              },
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "var(--black)",
              border: "1px solid var(--white)",
              borderRadius: "5px",
            }),
            multiValue: (baseStyles) => ({
              ...baseStyles,
              "[role='button']": {
                color: "var(--black)",
              },
              "[role='button']:hover": {
                backgroundColor: "var(--satan)",
                color: "var(--white)",
              },
            }),
            option: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "var(--black)",
              cursor: "pointer",
              fontSize: "var(--text-xs)",
              marginBottom: "var(--space-xxs)",
              padding: "var(--space-xxs) var(--space-xs)",
              "&:hover": {
                backgroundColor: "var(--white)",
                color: "var(--black)",
              },
            }),
            singleValue: (baseStyles) => ({
              ...baseStyles,
              color: "var(--white)",
            }),
          }}
        />
      </div>
      <button
        aria-label="Search events"
        onClick={handleSubmit}
        className={styles.searchButton}
        title="Search events"
        disabled={
          !startDate && !endDate && selectedSources.length === 0 && !keyword
        }
      >
        Search
      </button>
    </section>
  );
}

export default memo(FilterAndSearch);
