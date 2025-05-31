import type { Locale } from 'date-fns';
import type { Option } from 'src/types/index.js';
import type { FilterAndSearchProps } from './FilterAndSearch.types.ts';
import { useQueryClient } from '@tanstack/react-query';
import { addDays, addHours, addMonths, format, subDays } from 'date-fns';

import { enCA, es, frCA } from 'date-fns/locale';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { DayPicker } from 'react-day-picker';
import { useTranslation } from 'react-i18next';
import { GoSearch, GoX } from 'react-icons/go';

import DropdownMenu from 'src/components/DropdownMenu/DropdownMenu.tsx';
import ModalWithButton from 'src/components/ModalWithButton/ModalWithButton.tsx';
import { getNextWeekend, getThisWeekend } from 'src/utils/datetime/index.ts';
import styles from './FilterAndSearch.module.css';
import 'react-day-picker/style.css';

const supportedSources = [
  { value: 'askapunk', label: 'AskAPunk' },
  { value: 'blueskiesturnblack', label: 'BSTB' },
  { value: 'ravewave', label: 'Ravewave' },
  { value: 'casadelpopolo', label: 'Suoni' },
  { value: 'turbohaus', label: 'Turbohaus' },
];

function FilterAndSearch({ keyword, startDate, endDate, setKeyword, setStartDate, setEndDate, sources, setSources }: FilterAndSearchProps) {
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
  const [datePreset, setDatePreset] = useState<Option | null>(null);
  const [datepickerLocal, setDatepickerLocale] = useState(enCA);
  const [keywordInput, setKeywordInput] = useState('');
  // (keyword.length >= 3 && keyword.match(/^[a-z0-9\s]+$/i))

  const [isModalOpen, setIsModalOpen] = useState(false);

  const supportedDatePresets = useMemo(() => [
    { value: 'today', label: t('calendar.today') },
    { value: 'week', label: t('calendar.this-week') },
    { value: 'month', label: t('calendar.this-month') },
    { value: 'weekend', label: t('calendar.this-weekend') },
    { value: 'nextweekend', label: t('calendar.next-weekend') },
  ], [t]);

  const handleClearKeyword = useCallback(() => {
    setKeyword('');
    setKeywordInput('');

    queryClient.removeQueries({
      queryKey: ['events'],
      exact: false,
    });
  }, [queryClient, setKeyword]);

  const handleDatepickerLocaleChange = useCallback(
    (locale: Locale) => {
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setDatepickerLocale(locale);
    },
    [],
  );

  const handleDatePresetChange = useCallback((selectedOption: Option | null) => {
    setDatePreset(selectedOption);
  }, []);

  const handleStartDateChange = useCallback((date: Date | undefined) => {
    setStartDate(date);
  }, [setStartDate]);

  const handleEndDateChange = useCallback((date: Date | undefined) => {
    setEndDate(date);
  }, [setEndDate]);

  // const handleReset: () => void = useCallback(() => {
  //   setKeyword('');
  //   setSources([]);
  //   setStartDate(null);
  //   setEndDate(null);
  // }, []);

  const selectDateRange = useCallback((dates: Date[]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  }, [setEndDate, setStartDate]);

  const handleSourceSelectChange = useCallback(
    (selectedOptions: Option[]) => {
      const newSources = selectedOptions.map(option => option.value);

      queryClient.removeQueries({
        queryKey: ['events', keyword, startDate, endDate, sources],
        exact: true,
      });

      setSources(newSources);
    },
    [endDate, keyword, queryClient, setSources, sources, startDate],
  );

  const sourceMultiValue = useMemo(() => supportedSources.filter(source =>
    sources.includes(source.value),
  ), [sources]);

  useEffect(() => {
    if (i18n.language === 'fr') {
      handleDatepickerLocaleChange(frCA);
    }
    else if (i18n.language === 'es') {
      handleDatepickerLocaleChange(es);
    }
    else {
      handleDatepickerLocaleChange(enCA);
    }
    return () => {
      handleDatepickerLocaleChange(enCA);
    };
  }, [handleDatepickerLocaleChange, i18n.language]);

  useEffect(() => {
    const { thisFriday, thisSunday } = getThisWeekend();
    const { nextFriday, nextSunday } = getNextWeekend();

    switch (datePreset?.value) {
      case 'today':
        handleStartDateChange(subDays(new Date(), 1));
        handleEndDateChange(addHours(new Date(), 12));
        break;
      case 'week':
        handleStartDateChange(subDays(new Date(), 1));
        handleEndDateChange(addDays(new Date(), 7));
        break;
      case 'month':
        handleStartDateChange(subDays(new Date(), 1));
        handleEndDateChange(addMonths(new Date(), 1));
        break;
      case 'weekend':
        handleStartDateChange(thisFriday);
        handleEndDateChange(thisSunday);
        break;
      case 'nextweekend':
        handleStartDateChange(nextFriday);
        handleEndDateChange(nextSunday);
        break;
      default:
        handleStartDateChange(subDays(new Date(), 1));
        handleEndDateChange(undefined);
        break;
    }
  }, [datePreset, handleEndDateChange, handleStartDateChange]);

  useEffect(() => {
    const handleLanguageChange = () => {
      switch (datePreset?.value) {
        case 'today':
          handleDatePresetChange({ value: 'today', label: t('calendar.today') });
          break;
        case 'week':
          handleDatePresetChange({ value: 'week', label: t('calendar.this-week') });
          break;
        case 'month':
          handleDatePresetChange({ value: 'month', label: t('calendar.this-month') });
          break;
        case 'weekend':
          handleDatePresetChange({ value: 'weekend', label: t('calendar.this-weekend') });
          break;
        case 'nextweekend':
          handleDatePresetChange({ value: 'nextweekend', label: t('calendar.next-weekend') });
          break;
        default:
          handleDatePresetChange(null);
          break;
      }
    };
    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n, datePreset, t, handleDatePresetChange]);

  return (
    <section className={styles.container}>
      <div className={styles.searchSelectContainer}>
        <div className={styles.searchContainer}>
          <label className={styles.label} htmlFor="keyword">
            {t('calendar.enter-keyword')}
          </label>
          <input
            className={styles.input}
            title={t('calendar.enter-keyword')}
            id="keyword"
            type="input"
            placeholder={t('calendar.enter-keyword')}
            value={keywordInput}
            onChange={e => setKeywordInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && setKeyword(keywordInput)}
          />
          <div className={styles.searchButtonContainer}>
            {keywordInput && (
              <button
                className={styles.clearSearchButton}
                type="button"
                title={t('calendar.clear')}
                onClick={handleClearKeyword}
              >
                <GoX />
              </button>
            )}
            <button
              className={styles.searchButton}
              type="submit"
              aria-label={t('calendar.search-events')}
              title={t('calendar.search-events')}
              onClick={() => setKeyword(keywordInput)}
            >
              <GoSearch />
            </button>
          </div>
        </div>
        <div className={styles.selectContainer}>
          <DropdownMenu
            ariaLabel={t('calendar.filter-source')}
            isMulti
            options={supportedSources}
            placeholder={t('calendar.filter-source')}
            onChange={handleSourceSelectChange}
            value={sourceMultiValue}
          />
        </div>
      </div>
      <div className={styles.dateControlsContainer}>
        <div className={styles.dateSelectContainer}>
          <DropdownMenu
            ariaLabel={t('calendar.filter-date')}
            options={supportedDatePresets}
            placeholder={t('calendar.filter-date')}
            onChange={handleDatePresetChange}
            value={datePreset}
          />
        </div>
        {/* <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            title={t('calendar.choose-dates')}
            type="button"
            onClick={() => setIsModalOpen(true)}
          >
            {t('calendar.choose-dates')}
          </button>
          <button type="reset" className={styles.button} onClick={handleReset}>
            {t('calendar.reset')}
          </button>
        </div> */}
      </div>
      {/* <div>
        <DayPicker
          animate
          locale={datepickerLocal}
          mode="range"
          selected={{ from: startDate, to: endDate }}
          onSelect={selectDateRange}
        />
      </div> */}
      {/* <ModalWithButton
        contentStyles={{ height: '350px', transform: 'translate(-50%, -50%)', width: '300px' }}
        insetValue="unset"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <section className={styles.modalContainer}>
          <h4 className={styles.modalTitle}>{t('calendar.choose-dates')}</h4>
          <DatePicker
            aria-label={t('calendar.choose-dates')}
            locale={datepickerLocal}
            dateFormat="yyyy.MM.dd"
            icon={null}
            inline
            minDate={new Date()}
            startDate={startDate}
            endDate={endDate}
            onChange={selectDateRange}
            selected={startDate}
            selectsRange
          />
          { startDate && endDate && (
            <span className={styles.dateRange}>
              {format(startDate, 'yyyy.MM.dd')}
              {' '}
              -
              {' '}
              {format(endDate, 'yyyy.MM.dd')}
            </span>
          )}
        </section>
      </ModalWithButton> */}
    </section>
  );
}

export default memo(FilterAndSearch);
