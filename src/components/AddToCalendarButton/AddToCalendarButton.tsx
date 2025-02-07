import { memo, useEffect, useMemo, useRef, useState } from "react";
import { google, outlook, ics } from "calendar-link";
import { useTranslation } from "react-i18next";
import type { CalendarEvent } from "calendar-link";

import { PiMicrosoftOutlookLogo } from "react-icons/pi";
import { SiApple, SiGooglecalendar } from "react-icons/si";

import styles from "./AddToCalendarButton.module.css";

function AddToCalendarButton({ title, start, location }: CalendarEvent) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const buttonContainerRef = useRef<HTMLDivElement>(null);

  const handleOnClick = (event: MouseEvent) => {
    if (
      buttonContainerRef.current &&
      !event.composedPath().includes(buttonContainerRef.current)
    ) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 27 || event.code === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", (event) => handleOnClick(event));
    document.addEventListener("keydown", (event) => handleKeyDown(event));

    return () => {
      document.removeEventListener("click", (event) => handleOnClick(event));
      document.removeEventListener("keydown", (event) => handleKeyDown(event));
    };
  }, []);

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
    <div ref={buttonContainerRef} className={styles.container}>
      <button
        className={styles.button}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={styles.buttonText}>
          {t("event-listing.add-to-calendar")}
        </span>
      </button>
      <ul className={`${isOpen ? styles.open : styles.closed} ${styles.list}`}>
        <li>
          <a className={styles.link} href={icsUrl} target="_blank">
            <SiApple className={styles.icon} />
            iCal .ics
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
