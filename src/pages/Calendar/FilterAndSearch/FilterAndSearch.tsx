import { memo, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import Select from "react-select";

import { format, set, subDays } from "date-fns";
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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
  }, [i18n.language]);

  const handleSubmit = () => {
    let queryString = "";
    if (startDate) {
      queryString += `start=${startDate}`;
    }
    if (endDate) {
      queryString += `&end=${endDate}`;
    }
    if (selectedSources.length > 0) {
      queryString += `&source=${selectedSources.join(",")}`;
    }
    if (keyword) {
      queryString += `&keyword=${keyword}`;
    }
    console.log("clickkkkkkk", queryString);

    setQueryString(queryString);
    setKeyword("");
    setSelectedSources([]);
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className={styles.container}>
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
        <DatePicker
          locale={datepickerLocal}
          placeholderText="Start date range"
          selectsStart
          minDate={subDays(new Date(), 1)}
          maxDate={subDays(endDate, 1)}
          onChange={(date) =>
            setStartDate(format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"))
          }
          selected={startDate}
        />
        <DatePicker
          locale={datepickerLocal}
          placeholderText="End date range"
          selectsEnd
          minDate={new Date()}
          onChange={(date) =>
            setEndDate(format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"))
          }
          selected={endDate}
        />
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
        onClick={handleSubmit}
        className={styles.searchButton}
        title="Search"
        disabled={
          !startDate && !endDate && selectedSources.length === 0 && !keyword
        }
      >
        Search
      </button>
    </div>
  );
}

export default memo(FilterAndSearch);
