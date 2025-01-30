import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import Zoom from "react-medium-image-zoom";
import { GoX } from "react-icons/go";

import AddToCalendarButton from "src/components/AddToCalendarButton/AddToCalendarButton";

import { EventListingProps } from "./EventListing.types";

import styles from "./EventListing.module.css";
import "./ZoomStyles.css";
import "react-medium-image-zoom/dist/styles.css";

function EventListing({ event, closeModal }: EventListingProps) {
  const { t } = useTranslation();

  const { title, dateShowTime, venue, address, price, image, moreInfoLink } =
    event;

  const parsedDate = useMemo(
    () => format(new Date(dateShowTime), "yyyy.MM.dd - HH:mm"),
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
            <time>{parsedDate}</time>
          </div>
          <div>{venue}</div>
          <div>{address}</div>
          <div>{price ?? t("event-listing.no-price")}</div>
          <div className={styles.controls}>
            <a
              className={styles.moreInfoLink}
              href={moreInfoLink ?? ""}
              target="_blank"
            >
              {t("event-listing.more-info")}
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
