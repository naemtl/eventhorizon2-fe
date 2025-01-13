import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import Zoom from "react-medium-image-zoom";
import { GoInfo, GoX } from "react-icons/go";

import AddToCalendarButton from "src/components/AddToCalendarButton/AddToCalendarButton";

import { EventListingProps } from "./EventListing.types";

import styles from "./EventListing.module.css";
import "./ZoomStyles.css";
import "react-medium-image-zoom/dist/styles.css";

function EventListing({ event, closeModal }: EventListingProps) {
  const { t } = useTranslation();

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
  } = event;

  const parsedDate = useMemo(
    () => dayjs(dateShowTime).format("DD.MM.YYYY HH:mm"),
    [dateShowTime]
  );

  return (
    <main className={styles.container}>
      <button title="Close" className={styles.closeButton} onClick={closeModal}>
        <GoX />
      </button>
      <div className={styles.innerContainer}>
        <Zoom classDialog="zoom-dialog">
          <figure className={styles.imgContainer}>
            {(image && (
              <img className={styles.poster} src={image} alt={title} />
            )) || <div>Poster not found</div>}
          </figure>
        </Zoom>
        <div className={styles.infoContainer}>
          <h1 className={styles.title}>{title}</h1>
          <div>
            <time>Date: {parsedDate}</time>
          </div>
          <div>
            {venue} - {address}
          </div>
          <div>{price ?? t("event-listing.no-price")}</div>
          <div className={styles.controls}>
            <a
              className={styles.moreInfoLink}
              href={moreInfoLink ?? ""}
              target="_blank"
            >
              <GoInfo /> <span className={styles.source}>{source}</span>
            </a>
            <AddToCalendarButton
              title={title}
              start={dateShowTime}
              location={`${venue} - ${address}`}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default memo(EventListing);
