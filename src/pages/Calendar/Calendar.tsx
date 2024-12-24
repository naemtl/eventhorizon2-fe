import { Link } from "react-router-dom";

import events from "../../dummy-events.json";

function Calendar() {
  return (
    <div>
      {events.map((event) => {
        return (
          <Link
            key={event.originalId}
            state={{ event }}
            to={`/event/${event.originalId}`}
          >
            {event.title}
          </Link>
        );
      })}
    </div>
  );
}

export default Calendar;
