import { memo, useMemo, useState } from "react";
import { google, outlook, ics, CalendarEvent } from "calendar-link";
import { PiCalendarBlankLight, PiMicrosoftOutlookLogo } from "react-icons/pi";
import { SiGooglecalendar } from "react-icons/si";

import styles from "./AddToCalendarButton.module.css";

function AddToCalendarButton({ title, start, location }: CalendarEvent) {
  const [isOpen, setIsOpen] = useState(false);

  const event: CalendarEvent = useMemo(
    () => ({
      title,
      start,
      duration: [5, "hour"],
      location,
    }),
    [title, start, location]
  );

  const googleUrl = google(event);
  const outlookUrl = outlook(event);
  const icsUrl = ics(event);

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Add to Calendar
      </button>
      <ul className={`${isOpen ? styles.open : styles.closed} ${styles.list}`}>
        <li>
          <a className={styles.link} href={icsUrl} target="_blank">
            <PiCalendarBlankLight className={styles.icon} />
            iCal File
          </a>
        </li>
        <li>
          <a className={styles.link} href={googleUrl} target="_blank">
            <SiGooglecalendar className={styles.icon} />
            Google
          </a>
        </li>
        <li>
          <a className={styles.link} href={outlookUrl} target="_blank">
            <PiMicrosoftOutlookLogo className={styles.icon} />
            Outlook
          </a>
        </li>
      </ul>
    </div>
  );
}

export default memo(AddToCalendarButton);
