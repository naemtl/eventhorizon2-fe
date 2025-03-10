import type { EventCardProps } from './EventCard.types.ts';
import { format } from 'date-fns';
import { memo, useMemo, useState } from 'react';

import Modal from 'react-modal';
import EventListingModal from 'src/pages/EventListingModal/EventListingModal.tsx';

import styles from './EventCard.module.css';

function EventCard({ event }: EventCardProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const parsedDate = useMemo(
    () => format(new Date(event.dateShowTime), 'yyyy.MM.dd'),
    [event.dateShowTime],
  );

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <article className={styles.container}>
      <div onClick={openModal}>
        <figure className={styles.imgContainer}>
          {(event.image && (
            <img
              className={styles.poster}
              src={event.image}
              alt={event.title}
            />
          )) || <div>Poster not found</div>}
        </figure>
        <div className={styles.infoContainer}>
          <section className={styles.dateLocation}>
            <time>{parsedDate}</time>
            <div>{event.venue ?? 'Missing venue'}</div>
          </section>
          <h4 className={styles.title}>{event.title}</h4>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            background: 'rgb(0, 0, 0)',
            inset: '20px',
          },
        }}
      >
        <EventListingModal event={event} closeModal={closeModal} />
      </Modal>
    </article>
  );
}

export default memo(EventCard);
