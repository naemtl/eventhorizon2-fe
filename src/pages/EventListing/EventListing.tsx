import { useLocation } from "react-router-dom";

function EventListing() {
  const { state } = useLocation();

  return <div>EventListing</div>;
}

export default EventListing;
