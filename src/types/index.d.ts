interface FormattedEvent {
  originalId: string | number;
  title: string;
  dateShowTime: string;
  dateDoorTime: string | null;
  preciseTime: boolean;
  venue: string | null;
  address: string | null;
  price: string | null;
  image: string | null;
  moreInfoLink: string | null;
  source: string;
}

interface Option {
  value: string;
  label: string;
}

export type { FormattedEvent, Option };
