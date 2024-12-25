import { useLocation } from "react-router-dom";

function EventListing() {
  const { state } = useLocation();
  console.log(state);

  const {
    title,
    dateShowTime,
    preciseTime,
    venue,
    address,
    price,
    image,
    moreInfoLink,
    source,
  } = state.event;

  return (
    <div>
      <img src={image} alt={title} />
      <h1>{title}</h1>
      <p>{dateShowTime}</p>
      <p>{venue}</p>
      <p>{address}</p>
      <p>{price}</p>
      <p>{moreInfoLink}</p>
      <p>{source}</p>
    </div>
  );
}

export default EventListing;
