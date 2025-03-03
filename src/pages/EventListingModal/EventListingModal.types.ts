import type { FormattedEvent } from 'src/types/index.d.ts';

interface EventListingModalProps {
  event: FormattedEvent;
  closeModal: () => void;
}

export type { EventListingModalProps };
