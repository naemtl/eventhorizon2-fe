import { useTranslation } from "react-i18next";

import events from "src/dummy-events.json";
import EventCard from "src/components/EventCard/EventCard";

import styles from "./Calendar.module.css";

function Calendar() {
  const { t } = useTranslation();

  return (
    <main className={styles.container}>
      <h1>{t("calendar.title")}</h1>
      {events.map((event) => (
        <EventCard key={event.originalId} event={event} />
      ))}
    </main>
  );
}

export default Calendar;
