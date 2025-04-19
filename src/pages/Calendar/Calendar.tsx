import type { FormattedEvent } from 'src/types/index.d.ts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

import { fetchEvents } from 'src/api/events.ts';
import EventCard from 'src/components/EventCard/EventCard.tsx';
import GoToTopButton from 'src/components/GoToTopButton/GoToTopButton.tsx';

import styles from './Calendar.module.css';
import FilterAndSearch from './FilterAndSearch/FilterAndSearch.tsx';

function Calendar() {
  const { t } = useTranslation();
  const [queryString, setQueryString] = useState('');
  const [showGoToTopButton, setShowGoToTopButton] = useState(false);
  const { ref, inView } = useInView();

  const { data, error, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['events', queryString],
    queryFn: ({ pageParam }) => fetchEvents({ pageParam, queryString }),
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage.nextCursor,
  });

  const loadingQuery = status === 'pending';

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleShowGoToTopButton = useCallback(() => {
    const position = window.pageYOffset;
    if (position > 500) {
      setShowGoToTopButton(true);
    }
    else {
      setShowGoToTopButton(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleShowGoToTopButton);
    return () => {
      window.removeEventListener('scroll', handleShowGoToTopButton);
    };
  }, [handleShowGoToTopButton]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <main className={styles.container}>
      <div className={styles.headerContainer}>
        <FilterAndSearch />
        <h1 className={styles.title}>{t('calendar.title')}</h1>
      </div>
      <div className={styles.innerContainer}>
        {loadingQuery && <div>{t('calendar.loading')}</div>}
        {!loadingQuery && data?.pages?.map(page => (
          page.events.map((event: FormattedEvent) => (
            <EventCard key={event.originalId} event={event} />
          ))
        ))}
        <div ref={ref}>
          {isFetchingNextPage && <div>{t('calendar.loading')}</div>}
        </div>
      </div>
      <GoToTopButton showButton={showGoToTopButton} handleScrollToTop={handleScrollToTop} />
    </main>
  );
}

export default memo(Calendar);
