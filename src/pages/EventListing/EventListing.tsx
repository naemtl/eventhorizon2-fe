import { memo, useMemo } from "react";
import { useLocation } from "react-router-dom";

import styles from "./EventListing.module.css";
import dayjs from "dayjs";
import { AddToCalendarButton } from "add-to-calendar-button-react";

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
    () => dayjs(dateShowTime).format("DD.MM.YYYY hh:mm"),
    [dateShowTime]
  );

  const addToCalendarDateTime = useMemo(
    () => dayjs(dateShowTime).format("YYYY-MM-DD hh:mm"),
    [dateShowTime]
  );

  const addToCalendarTimeArray = useMemo(
    () => addToCalendarDateTime.split(" "),
    [addToCalendarDateTime]
  );

  console.log(addToCalendarTimeArray);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.infoContainer}>
        <h1>{title}</h1>
        <div>Date: {parsedDate}</div>
        <div>
          Location: {venue} - {address}
        </div>
        <div>Price: {price ?? "Check source for cost of entry"}</div>
        <a href={moreInfoLink ?? ""}>More info: {source}</a>
        <AddToCalendarButton
          name={title}
          startDate={addToCalendarTimeArray[0]}
          // startTime={addToCalendarTimeArray[1]} FIXME: not working
          endDate={addToCalendarTimeArray[0]}
          // endTime={addToCalendarTimeArray[1]}
          location={`${venue} - ${address}`}
          options={["Google", "iCal", "Outlook.com"]}
          lightMode="dark"
        />
      </div>
    </div>
  );
}

export default memo(EventListing);
