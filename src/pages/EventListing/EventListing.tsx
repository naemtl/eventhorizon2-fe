import { getRouteApi } from '@tanstack/react-router';
import { memo } from 'react';

import EventListingDetails from 'src/components/EventListingDetails/EventListingDetails.tsx';

import styles from './EventListing.module.css';

function EventListing() {
  const route = getRouteApi('/events/$eventId');
  const event = route.useLoaderData();

  return (
    <div className={styles.container}>
      <EventListingDetails event={event} />
    </div>
  );
}

export default memo(EventListing);
