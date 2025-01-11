import { FormattedEvent } from "src/types/index";

interface EventListingProps {
  event: FormattedEvent;
  closeModal: () => void;
}

export type { EventListingProps };