import type { EventCardProps } from './EventCard.types.ts';
import { format } from 'date-fns';
import { memo, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import EventListingDetails from '../EventListingDetails/EventListingDetails.tsx';

import ModalWithButton from '../ModalWithButton/ModalWithButton.tsx';
import styles from './EventCard.module.css';

function EventCard({ event }: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const parsedDate = useMemo(
    () => format(new Date(event.dateShowTime), 'yyyy.MM.dd'),
    [event.dateShowTime],
  );

  return (
    <article className={styles.container}>
      <div onClick={() => setIsModalOpen(true)}>
        <figure className={styles.imgContainer}>
          {(event.image && (
            <img
              className={styles.poster}
              src={event.image}
              alt={event.title}
            />
          )) || <div className={styles.placeholder}>{t('event-listing.no-poster')}</div>}
        </figure>
        <div className={styles.infoContainer}>
          <section className={styles.dateLocation}>
            <time>{parsedDate}</time>
            <div>{event.venue ?? 'Missing venue'}</div>
          </section>
          <h4 className={styles.title}>{event.title}</h4>
        </div>
      </div>
      <ModalWithButton
        insetValue="20px"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <EventListingDetails event={event} />
      </ModalWithButton>
    </article>
  );
}

export default memo(EventCard);
