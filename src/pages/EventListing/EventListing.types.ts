import { FormattedEvent } from "src/types/index";

interface EventListingProps {
  event: FormattedEvent;
  closeModal: (event: MouseEvent) => void;
}

export type { EventListingProps };