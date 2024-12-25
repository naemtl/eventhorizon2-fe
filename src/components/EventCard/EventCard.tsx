import { EventCardProps } from "./EventCard.types";

function EventCard({ event }: EventCardProps) {
  return (
    <div>
      <img src={event.image ?? ""} alt={event.title} />
      <h2>{event.title}</h2>
      <p>{event.dateShowTime}</p>
      <p>{event.venue}</p>
      <p>{event.address}</p>
      <p>{event.price}</p>
      <p>{event.moreInfoLink}</p>
      <p>{event.source}</p>
    </div>
  );
}

export default EventCard;
