import { useTranslation } from "react-i18next";

import events from "src/utils/dummy-events.json";
import EventCard from "src/components/EventCard/EventCard";

import styles from "./Calendar.module.css";

function Calendar() {
  const { t } = useTranslation();

  return (
    <main className={styles.container}>
      <div>
        <h1 className={styles.title}>{t("calendar.title")}</h1>
        {/* TODO: Add datepicker here */}
      </div>
      <div className={styles.innerContainer}>
        {events.map((event) => (
          <EventCard key={event.originalId} event={event} />
        ))}
      </div>
    </main>
  );
}

export default Calendar;
