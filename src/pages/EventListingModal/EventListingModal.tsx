import type { EventListingModalProps } from './EventListingModal.types.ts';

import { memo } from 'react';
import { GoX } from 'react-icons/go';

import EventListingDetails from 'src/components/EventListingDetails/EventListingDetails.tsx';

import styles from './EventListingModal.module.css';

function EventListingModal({ event, closeModal }: EventListingModalProps) {
  return (
    <main className={styles.container}>
      <button type="button" title="Close" className={styles.closeButton} onClick={closeModal}>
        <GoX />
      </button>
      <EventListingDetails event={event} />
    </main>
  );
}

export default memo(EventListingModal);
