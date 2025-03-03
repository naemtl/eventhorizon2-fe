import type { EventListingDetailsProps } from './EventListingDetails.types.ts';

import { format } from 'date-fns';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Zoom from 'react-medium-image-zoom';

import AddToCalendarButton from 'src/components/AddToCalendarButton/AddToCalendarButton.tsx';

import styles from './EventListingDetails.module.css';
import './ZoomStyles.css';
import 'react-medium-image-zoom/dist/styles.css';

function EventListingDetails({ event }: EventListingDetailsProps) {
  const { t } = useTranslation();

  const { title, dateShowTime, venue, address, price, image, moreInfoLink }
    = event;

  const parsedDate = useMemo(
    () => format(new Date(dateShowTime), 'yyyy.MM.dd - HH:mm'),
    [dateShowTime],
  );
  return (
    <div className={styles.container}>
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
        <div>{price ?? t('event-listing.no-price')}</div>
        <div className={styles.controls}>
          <a
            className={styles.moreInfoLink}
            href={moreInfoLink ?? ''}
            target="_blank"
            rel="noreferrer noopener"
          >
            {t('event-listing.more-info')}
          </a>
          <AddToCalendarButton
            title={title}
            start={dateShowTime}
            location={`${venue} - ${address}`}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(EventListingDetails);
