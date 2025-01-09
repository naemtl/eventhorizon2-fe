import { memo, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

import AddToCalendarButton from "src/components/AddToCalendarButton/AddToCalendarButton";

import styles from "./EventListing.module.css";

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
          title={title}
          start={dateShowTime}
          location={`${venue} - ${address}`}
        />
      </div>
    </main>
  );
}

export default memo(EventListing);
