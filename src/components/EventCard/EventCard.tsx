import { EventCardProps } from "./EventCard.types";

import styles from "./EventCard.module.css";

function EventCard({ event }: EventCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={event.image ?? ""} alt={event.title} />
      </div>
      <h3>{event.title}</h3>
      <div>{event.dateShowTime}</div>
      <div>{event.venue}</div>
      <div>{event.address}</div>
      <div>{event.price}</div>
      <a href={event.moreInfoLink ?? ""}>More info</a>
    </div>
  );
}

export default EventCard;
