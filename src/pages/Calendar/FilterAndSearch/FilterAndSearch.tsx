import { memo, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";

import { subDays } from "date-fns"; // TODO: use dayjs
import { enCA, frCA } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { GoSearch } from "react-icons/go";

import styles from "./FilterAndSearch.module.css";
import "react-datepicker/dist/react-datepicker.css";

function FilterAndSearch() {
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
    <div>
      <div className={styles.searchContainer}>
        <label className={styles.label} htmlFor="search">
          Search by title
        </label>
        <input
          className={styles.input}
          title="Search"
          id="search"
          type="search"
        />
        <button className={styles.searchButton} title="Search">
          <GoSearch />
        </button>
      </div>
      <div className={styles.dateContainer}>
        <DatePicker
          locale={datepickerLocal}
          selectsStart
          minDate={subDays(new Date(), 1)}
        />
        <DatePicker locale={datepickerLocal} selectsEnd minDate={new Date()} />
      </div>
    </div>
  );
}

export default memo(FilterAndSearch);
