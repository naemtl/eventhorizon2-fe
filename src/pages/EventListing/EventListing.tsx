import { useQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { memo } from 'react';

import { fetchEventListing } from 'src/api/eventListing.ts';
import EventListingDetails from 'src/components/EventListingDetails/EventListingDetails.tsx';

function EventListing() { // TODO: Pass event id
  const route = getRouteApi('/events/$eventId');
  const { event } = route.useLoaderData();

  // const { data: event } = useQuery({
  //   queryKey: ['events', { eventId }],
  //   queryFn: () => fetchEventListing(eventId),
  // });

  return (
    <div>
      <EventListingDetails event={event} />
    </div>
  );
}

export default memo(EventListing);
