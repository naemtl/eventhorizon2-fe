import { EventCardProps } from "./EventCard.types";

import styles from "./EventCard.module.css";

function EventCard({ event }: EventCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        {(event.image && <img src={event.image} alt={event.title} />) || (
          <div>Poster not found</div>
        )}
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.dateLocation}>
          <div>{event.dateShowTime}</div>
          <span>{event.venue ?? "Missing venue"}</span>
        </div>
        <h4>{event.title}</h4>
      </div>
    </div>
  );
}

export default EventCard;
