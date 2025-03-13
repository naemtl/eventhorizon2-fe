import { addDays, addMonths, format, subDays } from 'date-fns';
import { enCA, es, frCA } from 'date-fns/locale';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import DatePicker, { registerLocale } from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

import ModalWithButton from 'src/components/ModalWithButton/ModalWithButton.tsx';

import styles from './FilterAndSearch.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.css';

interface FilterAndSearchProps {
  setQueryString: (queryString: string) => void;
}

const sources = [
  { value: 'askapunk', label: 'AskAPunk' },
  { value: 'blueskiesturnblack', label: 'BSTB' },
  { value: 'ravewave', label: 'Ravewave' },
  { value: 'casadelpopolo', label: 'Suoni' },
  { value: 'turbohaus', label: 'Turbohaus' },
];

function FilterAndSearch({ setQueryString }: FilterAndSearchProps) {
  const { t, i18n } = useTranslation();

  const [datepickerLocal, setDatepickerLocale] = useState(enCA);
  const [keyword, setKeyword] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (i18n.language === 'fr') {
      registerLocale('frCA', frCA);
      setDatepickerLocale(frCA);
    }
    else if (i18n.language === 'es') {
      registerLocale('es', es);
      setDatepickerLocale(es);
    }
    else {
      registerLocale('enCA', enCA);
      setDatepickerLocale(enCA);
    }

    return () => {
      setDatepickerLocale(enCA);
    };
  }, [i18n.language]);

  const handleReset: () => void = useCallback(() => {
    setKeyword('');
    setSelectedSources([]);
    setStartDate(null);
    setEndDate(null);
  }, []);

  const handleSubmit: () => void = useCallback(() => {
    let queryString = '';

    if (startDate) {
      const formattedStartDate = format(startDate, 'yyyy-MM-dd');
      queryString += `start=${formattedStartDate}`;
    }
    if (endDate) {
      const formattedEndDate = format(endDate, 'yyyy-MM-dd');
      queryString += `&end=${formattedEndDate}`;
    }
    if (selectedSources.length > 0) {
      queryString += `&source=${selectedSources.join(',')}`;
    }
    if (keyword) {
      queryString += `&keyword=${keyword}`;
    }

    setQueryString(queryString);
    handleReset();
  }, [startDate, endDate, selectedSources, keyword, setQueryString, handleReset]);

  const isSubmitDisabled: boolean = useMemo(
    () =>
      !(
        (
          (!keyword
            || (keyword.length >= 3 && keyword.match(/^[a-z0-9\s]+$/i)))
          && (startDate || endDate || selectedSources.length > 0)
        ) // FIXME: make this better
      ),
    [startDate, endDate, selectedSources, keyword],
  );

  const selectDateRange = useCallback((dates: Date[]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  }, []);

  return (
    <section className={styles.container}>
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
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
        <button
          type="submit"
          aria-label={t('calendar.search-events')}
          onClick={handleSubmit}
          className={`${styles.button} ${
            isSubmitDisabled && styles.disabled
          }`}
          title={t('calendar.search-events')}
          disabled={isSubmitDisabled}
        >
          {t('calendar.search')}
        </button>
      </div>
      <div className={styles.selectContainer}>
        <Select
          isMulti
          options={sources}
          placeholder={t('calendar.filter-source')}
          isSearchable={false}
          onChange={selectedOptions =>
            setSelectedSources(selectedOptions.map(option => option.value))}
          value={sources.filter(source =>
            selectedSources.includes(source.value),
          )}
          styles={{
            control: baseStyles => ({
              ...baseStyles,
              'backgroundColor': 'var(--black)',
              'border': 'none',
              'borderBottom': '1px solid var(--white)',
              'borderColor': 'none',
              'borderRadius': '0',
              'boxShadow': 'none',
              'cursor': 'pointer',
              'fontSize': 'var(--text-xs)',
              '&:hover': {
                borderColor: 'var(--white)',
              },
              '& > div:first-of-type': {
                padding: '2px',
              },
            }),
            menu: baseStyles => ({
              ...baseStyles,
              backgroundColor: 'var(--black)',
              border: '1px solid var(--white)',
              borderRadius: '5px',
            }),
            multiValue: baseStyles => ({
              ...baseStyles,
              '[role=\'button\']': {
                color: 'var(--black)',
              },
              '[role=\'button\']:hover': {
                backgroundColor: 'var(--satan)',
                color: 'var(--white)',
              },
            }),
            placeholder: baseStyles => ({
              ...baseStyles,
              margin: 0,
            }),
            option: baseStyles => ({
              ...baseStyles,
              'backgroundColor': 'var(--black)',
              'cursor': 'pointer',
              'fontSize': 'var(--text-xs)',
              'marginBottom': 'var(--space-xxs)',
              'padding': 'var(--space-xxs) var(--space-xs)',
              '&:hover': {
                backgroundColor: 'var(--white)',
                color: 'var(--black)',
              },
            }),
            singleValue: baseStyles => ({
              ...baseStyles,
              color: 'var(--white)',
            }),
          }}
        />
      </div>
      <div className={styles.dateContainer}>
        <button
          className={styles.button}
          title={t('calendar.all-dates')}
          type="button"
          onClick={() => {
            setStartDate(null);
            setEndDate(null);
          }}
        >
          {t('calendar.all-dates')}
        </button>
        <button
          className={styles.button}
          title={t('calendar.today')}
          type="button"
          onClick={() => {
            setStartDate(subDays(new Date(), 1));
            setEndDate(new Date());
          }}
        >
          {t('calendar.today')}
        </button>
        <button
          className={styles.button}
          title={t('calendar.this-week')}
          type="button"
          onClick={() => {
            setStartDate(subDays(new Date(), 1));
            setEndDate(addDays(new Date(), 7));
          }}
        >
          {t('calendar.this-week')}
        </button>
        <button
          className={styles.button}
          title={t('calendar.this-month')}
          type="button"
          onClick={() => {
            setStartDate(subDays(new Date(), 1));
            setEndDate(addMonths(new Date(), 1));
          }}
        >
          {t('calendar.this-month')}
        </button>
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
      </div>
      <ModalWithButton
        customStyles={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            background: 'rgb(0, 0, 0)',
            inset: '220px',
            margin: '0 auto',
            maxWidth: '320px',
            width: '100%',
          },
        }}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        {/* @ts-expect-error TODO: fix */}
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
      </ModalWithButton>
    </section>
  );
}

export default memo(FilterAndSearch);
