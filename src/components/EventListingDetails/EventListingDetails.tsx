import type { EventListingDetailsProps } from './EventListingDetails.types.ts';

import { TZDate } from '@date-fns/tz';
import { format } from 'date-fns';
import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GoLinkExternal } from 'react-icons/go';
import Zoom from 'react-medium-image-zoom';

import eventHorizonImg from 'src/assets/eventhorizon.png';

import AddToCalendarButton from 'src/components/AddToCalendarButton/AddToCalendarButton.tsx';
import styles from './EventListingDetails.module.css';
import './ZoomStyles.css';
import 'react-medium-image-zoom/dist/styles.css';

function EventListingDetails({ event }: EventListingDetailsProps) {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);

  const { title, dateShowTime, venue, address, price, image, moreInfoLink, originalId }
    = event;

  const parsedDate = useMemo(
    () => {
      const zonedDate = new TZDate(dateShowTime, 'America/New_York');
      return format(zonedDate, 'yyyy.MM.dd - HH:mm');
    },
    [dateShowTime],
  );

  const imageToDisplay = useMemo(() => !image ? eventHorizonImg : image, [image]);

  const handleCopyLink = useCallback(
    async () => {
      await navigator.clipboard.writeText(`https://www.subscenemtl.net/events/${originalId}`);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    },
    [originalId],
  );

  return (
    <div className={styles.container}>
      <Zoom classDialog="zoom-dialog">
        <figure className={styles.imgContainer}>
          <img className={styles.poster} src={imageToDisplay} alt={title} />
        </figure>
      </Zoom>
      <div className={styles.infoContainer}>
        <h1 className={styles.title}>{title}</h1>
        <div>
          <time>{parsedDate}</time>
        </div>
        <div>
          {venue ?? ''}
          {address && (
            <span>
              {' '}
              -
              {' '}
              {address}
            </span>
          )}
        </div>
        {price && <div>{price}</div>}
        <div className={styles.controls}>
          <button
            className={styles.copyButton}
            onClick={handleCopyLink}
            type="button"
          >
            {isCopied ? `${t('event-listing.copied')}!` : t('event-listing.copy-link')}
          </button>
          <a
            aria-label={t('event-listing.more-info')}
            className={styles.moreInfoLink}
            href={moreInfoLink ?? ''}
            target="_blank"
            rel="noreferrer noopener"
          >
            <GoLinkExternal />
            {' '}
            {t('event-listing.more-info')}
          </a>
        </div>
        <AddToCalendarButton
          title={title}
          start={dateShowTime}
          location={`${venue} - ${address}`}
        />
      </div>
    </div>
  );
}

export default memo(EventListingDetails);
