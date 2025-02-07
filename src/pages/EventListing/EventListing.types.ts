import type { FormattedEvent } from "src/types/index.d.ts";

interface EventListingProps {
  event: FormattedEvent;
  closeModal: () => void;
}

export type { EventListingProps };