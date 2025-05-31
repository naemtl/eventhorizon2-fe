import type { EventCardProps } from './EventCard.types.ts';
import { format } from 'date-fns';
import { memo, useMemo, useState } from 'react';

import eventHorizonImg from 'src/assets/eventhorizon.png';
import EventListingDetails from '../EventListingDetails/EventListingDetails.tsx';

import ModalWithButton from '../ModalWithButton/ModalWithButton.tsx';
import styles from './EventCard.module.css';

function EventCard({ event }: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const imageToDisplay = useMemo(() => !event.image ? eventHorizonImg : event.image, [event.image]);

  const parsedDate = useMemo(
    () => format(new Date(event.dateShowTime), 'yyyy.MM.dd'),
    [event.dateShowTime],
  );

  return (
    <article className={styles.container}>
      <div onClick={() => setIsModalOpen(true)}>
        <figure className={styles.imgContainer}>
          <img
            className={event.image ? styles.poster : styles.placeholder}
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
