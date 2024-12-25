import { Link } from "react-router-dom";

import events from "../../dummy-events.json";
import EventCard from "../../components/EventCard/EventCard";

function Calendar() {
  return (
    <div>
      {events.map((event) => {
        return (
          <Link state={{ event }} to={`/event/${event.originalId}`}>
            <EventCard key={event.originalId} event={event} />
          </Link>
        );
      })}
    </div>
  );
}

export default Calendar;
