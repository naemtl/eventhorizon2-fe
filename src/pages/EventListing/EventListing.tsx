import { memo, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./EventListing.module.css";
import dayjs from "dayjs";
import { AddToCalendarButton } from "add-to-calendar-button-react";

function EventListing() {
  const { t } = useTranslation();
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

  const addToCalendarDateTime = useMemo(
    () => dayjs(dateShowTime).format("YYYY-MM-DD HH:mm"),
    [dateShowTime]
  );

  const addToCalendarTimeArray = useMemo(
    () => addToCalendarDateTime.split(" "),
    [addToCalendarDateTime]
  );

  console.log(addToCalendarTimeArray);

  return (
    <main className={styles.container}>
      <figure className={styles.imgContainer}>
        <img className={styles.poster} src={image} alt={title} />
      </figure>
      <div className={styles.infoContainer}>
        <h1 className={styles.title}>{title}</h1>
        <time>Date: {parsedDate}</time>
        <address>
          Location: {venue} - {address}
        </address>
        <div>
          {t("price")}: {price ?? "Check source for cost of entry"}
        </div>
        <a href={moreInfoLink ?? ""}>
          {t("more-info")}: {source}
        </a>
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
    </main>
  );
}

export default memo(EventListing);
