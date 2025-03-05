import { createFileRoute } from '@tanstack/react-router';
import { fetchEventListing } from 'src/api/eventListing.ts';
import EventListing from 'src/pages/EventListing/EventListing.tsx';

export const Route = createFileRoute('/events/$eventId')({
  component: EventListing,
  loader: async ({ params }) => {
    return fetchEventListing(params.eventId);
  },
});
