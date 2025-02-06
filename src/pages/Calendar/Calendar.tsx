import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import EventCard from "src/components/EventCard/EventCard";
import FilterAndSearch from "./FilterAndSearch/FilterAndSearch";

import type { FormattedEvent } from "src/types/index";
import styles from "./Calendar.module.css";

function Calendar() {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const [queryString, setQueryString] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:8888/.netlify/functions/read-events",
          {
            method: "GET",
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        );

        console.log("response", response);

        if (response.ok) {
          const data = await response.json();
          console.log("data", data);

          setEvents(data);
        } else {
          console.error("Error fetching events:", response.status);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>{t("calendar.title")}</h1>
        <FilterAndSearch setQueryString={setQueryString} />
      </div>
      <div className={styles.innerContainer}>
        {events.map((event: FormattedEvent) => (
          <EventCard key={event.originalId} event={event} />
        ))}
      </div>
    </main>
  );
}

export default memo(Calendar);
