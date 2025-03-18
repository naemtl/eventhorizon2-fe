import type { FormattedEvent } from 'src/types/index.d.ts';
import { useQuery } from '@tanstack/react-query';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { fetchEvents } from 'src/api/events.ts';
import EventCard from 'src/components/EventCard/EventCard.tsx';

import styles from './Calendar.module.css';
import FilterAndSearch from './FilterAndSearch/FilterAndSearch.tsx';

function Calendar() {
  const { t } = useTranslation();
  const [queryString, setQueryString] = useState('');

  const { data: events, isLoading } = useQuery({
    queryKey: ['events', queryString],
    queryFn: () => fetchEvents(queryString),
  });

  return (
    <main className={styles.container}>
      <div className={styles.headerContainer}>
        <FilterAndSearch />
        <h1 className={styles.title}>{t('calendar.title')}</h1>
      </div>
      <div className={styles.innerContainer}>
        {isLoading && <div>Loading...</div>}
        {!isLoading && events?.map((event: FormattedEvent) => (
          <EventCard key={event.originalId} event={event} />
        ))}
      </div>
    </main>
  );
}

export default memo(Calendar);
