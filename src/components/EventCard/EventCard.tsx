import { memo, useMemo } from "react";
import dayjs from "dayjs";

import { EventCardProps } from "./EventCard.types";

import styles from "./EventCard.module.css";

function EventCard({ event }: EventCardProps) {
  const parsedDate = useMemo(
    () => dayjs(event.dateShowTime).format("DD.MM.YYYY"),
    [event.dateShowTime]
  );

  return (
    <article className={styles.container}>
      <figure className={styles.imgContainer}>
        {(event.image && <img src={event.image} alt={event.title} />) || (
          <figcaption>Poster not found</figcaption>
        )}
      </figure>
      <div className={styles.infoContainer}>
        <section className={styles.dateLocation}>
          <time>{parsedDate}</time>
          <address>{event.venue ?? "Missing venue"}</address>
        </section>
        <h4>{event.title}</h4>
      </div>
    </article>
  );
}

export default memo(EventCard);
