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
  const [keyword, setKeyword] = useState<string>('');
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [sources, setSources] = useState<string[]>([]);
  const [showGoToTopButton, setShowGoToTopButton] = useState(false);

  const { ref, inView } = useInView();

  const { data, error, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['events', keyword, startDate, endDate, sources],
    queryFn: ({ pageParam }) => fetchEvents({ pageParam, keyword, startDate, endDate, sources }),
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage?.nextCursor,
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
        <FilterAndSearch
          setKeyword={setKeyword}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          sources={sources}
          setSources={setSources}
        />
        <h1 className={styles.title}>{t('calendar.title')}</h1>
      </div>
      <div className={styles.innerContainer}>
        {loadingQuery && (
          <div className={styles.loading}>
            {t('calendar.loading')}
            ...
          </div>
        )}
        {(error || (!loadingQuery && !data.pages[0])) && (
          <div className={styles.error}>
            {t('calendar.error-contact')}
            {' '}
            ms@subscenemtl.net
          </div>
        )}
        {!loadingQuery && data?.pages?.map(page => (
          page?.events.map((event: FormattedEvent) => (
            <EventCard key={event.originalId} event={event} />
          ))
        ))}
        <div ref={ref}>
          {isFetchingNextPage && (
            <div className={styles.loading}>
              {t('calendar.loading')}
              ...
            </div>
          )}
        </div>
      </div>
      <GoToTopButton showButton={showGoToTopButton} handleScrollToTop={handleScrollToTop} />
    </main>
  );
}

export default memo(Calendar);
