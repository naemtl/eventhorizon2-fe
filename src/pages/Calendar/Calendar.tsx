import { memo } from "react";
import { useTranslation } from "react-i18next";

import EventCard from "src/components/EventCard/EventCard";
import FilterAndSearch from "./FilterAndSearch/FilterAndSearch";

import events from "src/utils/dummy-events.json";
import styles from "./Calendar.module.css";

function Calendar() {
  const { t } = useTranslation();

  return (
    <main className={styles.container}>
      <div>
        <h1 className={styles.title}>{t("calendar.title")}</h1>
        <FilterAndSearch />
      </div>
      <div className={styles.innerContainer}>
        {events.map((event) => (
          <EventCard key={event.originalId} event={event} />
        ))}
      </div>
    </main>
  );
}

export default memo(Calendar);
