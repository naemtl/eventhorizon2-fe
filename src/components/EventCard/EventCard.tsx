import type { EventCardProps } from './EventCard.types.ts';
import { Link } from '@tanstack/react-router';
import { format } from 'date-fns';
import { memo, useMemo, useState } from 'react';

import subscenePlaceholder from 'src/assets/subsceneportrait.jpeg';
import EventListingDetails from '../EventListingDetails/EventListingDetails.tsx';

import ModalWithButton from '../ModalWithButton/ModalWithButton.tsx';
import styles from './EventCard.module.css';

function EventCard({ event }: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const imageToDisplay = useMemo(
    () => (event.image === null ? subscenePlaceholder : event.image),
    [event.image],
  );

  const parsedDate = useMemo(
    () => format(new Date(event.dateShowTime), 'yyyy.MM.dd'),
    [event.dateShowTime],
  );

  return (
    <article className={styles.container}>
      <Link
        to='/'
        hash={`modal-${event.originalId}`}
        mask={{ to: '/events/$eventId', params: { eventId: event.originalId } }}
        onClick={(e) => {
          if (e.button === 0 && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey)
            setIsModalOpen(true);
        }}
      >
        <figure className={styles.imgContainer}>
          <img
            className={event.image !== null ? styles.poster : styles.placeholder}
            src={imageToDisplay}
            alt={event.title}
          />
        </figure>
        <div className={styles.infoContainer}>
          <section className={styles.dateLocation}>
            <time>{parsedDate}</time>
            <div>{event.venue ?? ''}</div>
          </section>
          <h2 className={styles.title}>{event.title}</h2>
        </div>
      </Link>
      <ModalWithButton
        isModalOpen={isModalOpen}
        parentClassName={styles.eventDialog}
        setIsModalOpen={setIsModalOpen}
      >
        <EventListingDetails event={event} />
      </ModalWithButton>
    </article>
  );
}

export default memo(EventCard);
