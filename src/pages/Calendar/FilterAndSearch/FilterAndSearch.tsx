import { memo, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";

import { subDays } from "date-fns";
import { enCA, frCA } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { GoSearch } from "react-icons/go";

import styles from "./FilterAndSearch.module.css";
import "react-datepicker/dist/react-datepicker.css";

interface FilterAndSearchProps {
  setQueryString: (queryString: string) => void;
}

function FilterAndSearch({ setQueryString }: FilterAndSearchProps) {
  const { i18n } = useTranslation();

  const [datepickerLocal, setDatepickerLocale] = useState(enCA);

  useEffect(() => {
    if (i18n.language === "fr") {
      registerLocale("frCA", frCA);
      setDatepickerLocale(frCA);
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
        />
        <DatePicker locale={datepickerLocal} selectsEnd minDate={new Date()} />
      </div>
      <button className={styles.searchButton} title="Search">
        <GoSearch /> Search
      </button>
    </div>
  );
}

export default memo(FilterAndSearch);
