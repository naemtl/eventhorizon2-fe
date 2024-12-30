import { memo, useMemo } from "react";
import { useLocation } from "react-router-dom";

import styles from "./EventListing.module.css";
import dayjs from "dayjs";

function EventListing() {
  const { state } = useLocation();

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

  const parsedDate = useMemo(
    () => dayjs(dateShowTime).format("DD.MM.YYYY HH:mm"),
    [dateShowTime]
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.imgContainer}>
          <img src={image} alt={title} />
        </div>
        <h1>{title}</h1>
      </div>
      <div className={styles.infoContainer}>
        <div>
          <div>{parsedDate}</div>
          <div>
            {venue} - {address}
          </div>
          <div>{price ?? "Check source for cost of entry"}</div>
          <a href={moreInfoLink ?? ""}>More info - {source}</a>
        </div>
      </div>
    </div>
  );
}

export default memo(EventListing);
