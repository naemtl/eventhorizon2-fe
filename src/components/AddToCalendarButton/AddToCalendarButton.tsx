import type { CalendarEvent } from 'calendar-link';
import { google, ics, outlook } from 'calendar-link';
import { memo, useMemo } from 'react';

import { PiMicrosoftOutlookLogo } from 'react-icons/pi';
import { SiApple, SiGooglecalendar } from 'react-icons/si';

import styles from './AddToCalendarButton.module.css';

function AddToCalendarButton({ title, start, location }: CalendarEvent) {
  const event: CalendarEvent = useMemo(
    () => ({ title, start, duration: [5, 'hour'], location }),
    [title, start, location],
  );

  const googleUrl = google(event);
  const outlookUrl = outlook(event);
  const icsUrl = ics(event);

  return (
    <section className={styles.container}>
      <a
        className={styles.link}
        href={icsUrl}
        target="_blank"
        rel="noreferrer noopener"
      >
        <SiApple className={styles.icon} />
        iCal .ics
      </a>
      <a
        className={styles.link}
        href={googleUrl}
        target="_blank"
        rel="noreferrer noopener"
      >
        <SiGooglecalendar className={styles.icon} />
        Google
      </a>
      <a
        className={styles.link}
        href={outlookUrl}
        target="_blank"
        rel="noreferrer noopener"
      >
        <PiMicrosoftOutlookLogo className={styles.icon} />
        Outlook
      </a>
    </section>
  );
}

export default memo(AddToCalendarButton);
