import { memo, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import Select from "react-select";

import { subDays } from "date-fns";
import { enCA, frCA, es } from "date-fns/locale";
import { useTranslation } from "react-i18next";

import styles from "./FilterAndSearch.module.css";
import "react-datepicker/dist/react-datepicker.css";
import "./Datepicker.css";

interface FilterAndSearchProps {
  setQueryString: (queryString: string) => void;
}

function FilterAndSearch({ setQueryString }: FilterAndSearchProps) {
  const { i18n } = useTranslation();

  const [datepickerLocal, setDatepickerLocale] = useState(enCA);

  const sources = [
    { value: "askapunk", label: "AskAPunk" },
    { value: "blueskiesturnblack", label: "BSTB" },
    { value: "ravewave", label: "Ravewave" },
    { value: "casadelpopolo", label: "Suoni" },
    { value: "turbohaus", label: "Turbohaus" },
  ];

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

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <label className={styles.label} htmlFor="search">
          Search by title
        </label>
        <input
          className={styles.input}
          title="Search"
          id="search"
          type="search"
          placeholder="Enter keyword"
        />
      </div>
      <div className={styles.dateContainer}>
        <DatePicker
          locale={datepickerLocal}
          selectsStart
          minDate={subDays(new Date(), 1)}
          placeholderText="Start date range"
        />
        <DatePicker
          locale={datepickerLocal}
          selectsEnd
          minDate={new Date()}
          placeholderText="End date range"
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
      <button className={styles.searchButton} title="Search">
        Search
      </button>
    </div>
  );
}

export default memo(FilterAndSearch);
