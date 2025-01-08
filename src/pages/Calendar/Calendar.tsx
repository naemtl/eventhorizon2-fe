import events from "../../dummy-events.json";
import EventCard from "../../components/EventCard/EventCard";

import styles from "./Calendar.module.css";

function Calendar() {
  return (
    <main className={styles.container}>
      {events.map((event) => (
        <EventCard key={event.originalId} event={event} />
      ))}
    </main>
  );
}

export default Calendar;
