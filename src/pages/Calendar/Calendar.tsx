import { Link } from "react-router-dom";

import events from "../../dummy-events.json";
import EventCard from "../../components/EventCard/EventCard";

import styles from "./Calendar.module.css";

function Calendar() {
  return (
    <div className={styles.container}>
      {events.map((event) => {
        return (
          <Link
            key={event.originalId}
            state={{ event }}
            to={`/event/${event.originalId}`}
          >
            <EventCard event={event} />
          </Link>
        );
      })}
    </div>
  );
}

export default Calendar;
