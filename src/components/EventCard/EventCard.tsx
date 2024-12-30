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
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        {(event.image && <img src={event.image} alt={event.title} />) || (
          <div>Poster not found</div>
        )}
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.dateLocation}>
          <div>{parsedDate}</div>
          <span>{event.venue ?? "Missing venue"}</span>
        </div>
        <h4>{event.title}</h4>
      </div>
    </div>
  );
}

export default memo(EventCard);
