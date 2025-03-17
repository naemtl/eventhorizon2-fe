import type { Option } from 'src/types/index.js';
import { addDays, addMonths, subDays } from 'date-fns';
import { enCA, es, frCA } from 'date-fns/locale';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';

import { useTranslation } from 'react-i18next';

import DropdownMenu from 'src/components/DropdownMenu/DropdownMenu.tsx';
import ModalWithButton from 'src/components/ModalWithButton/ModalWithButton.tsx';
import styles from './FilterAndSearch.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.css';

const sources = [
  { value: 'askapunk', label: 'AskAPunk' },
  { value: 'blueskiesturnblack', label: 'BSTB' },
  { value: 'ravewave', label: 'Ravewave' },
  { value: 'casadelpopolo', label: 'Suoni' },
  { value: 'turbohaus', label: 'Turbohaus' },
];

function FilterAndSearch() {
  const { t, i18n } = useTranslation();

  const [datepickerLocal, setDatepickerLocale] = useState(enCA);
  const [keyword, setKeyword] = useState<string>('');
  // (keyword.length >= 3 && keyword.match(/^[a-z0-9\s]+$/i))

  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [selectedDatePreset, setSelectedDatePreset] = useState<Option | null>(null);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const datePresets = useMemo(() => [
    { value: 'all', label: t('calendar.all-dates') },
    { value: 'today', label: t('calendar.today') },
    { value: 'week', label: t('calendar.this-week') },
    { value: 'month', label: t('calendar.this-month') },
  ], [t]);

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

  useEffect(() => {
    switch (selectedDatePreset?.value) {
      case 'all':
        setStartDate(subDays(new Date(), 1));
        setEndDate(null);
        break;
      case 'today':
        setStartDate(subDays(new Date(), 1));
        setEndDate(new Date());
        break;
      case 'week':
        setStartDate(subDays(new Date(), 1));
        setEndDate(addDays(new Date(), 7));
        break;
      case 'month':
        setStartDate(subDays(new Date(), 1));
        setEndDate(addMonths(new Date(), 1));
        break;
      default:
        setStartDate(subDays(new Date(), 1));
        setEndDate(null);
        break;
    }
  }, [selectedDatePreset]);

  useEffect(() => {
    const handleLanguageChange = () => {
      switch (selectedDatePreset?.value) {
        case 'all':
          setSelectedDatePreset({ value: 'all', label: t('calendar.all-dates') });
          break;
        case 'today':
          setSelectedDatePreset({ value: 'today', label: t('calendar.today') });
          break;
        case 'week':
          setSelectedDatePreset({ value: 'week', label: t('calendar.this-week') });
          break;
        case 'month':
          setSelectedDatePreset({ value: 'month', label: t('calendar.this-month') });
          break;
        default:
          setSelectedDatePreset(null);
          break;
      }
    };
    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n, selectedDatePreset, t]);

  const handleReset: () => void = useCallback(() => {
    setKeyword('');
    setSelectedSources([]);
    setStartDate(null);
    setEndDate(null);
  }, []);

  const selectDateRange = useCallback((dates: Date[]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  }, []);

  const handleSourceSelectChange = useCallback(
    (selectedOptions: Option[]) =>
      setSelectedSources(selectedOptions.map(option => option.value)),
    [],
  );

  const handleDatePresetChange = useCallback(
    (selectedOption: Option) => {
      setSelectedDatePreset(selectedOption);
    },
    [],
  );

  const selectMultiValue = useMemo(() => sources.filter(source =>
    selectedSources.includes(source.value),
  ), [selectedSources]);

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
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
          <button
            type="submit"
            aria-label={t('calendar.search-events')}
            // onClick={handleSubmit}
            title={t('calendar.search-events')}
          >
            {t('calendar.search')}
          </button>
        </div>
        <div className={styles.selectContainer}>
          <DropdownMenu
            isMulti
            options={sources}
            placeholder={t('calendar.filter-source')}
            onChange={handleSourceSelectChange}
            value={selectMultiValue}
          />
        </div>
      </div>
      <div className={styles.dateContainer}>
        <DropdownMenu
          options={datePresets}
          placeholder={t('calendar.filter-date')}
          onChange={handleDatePresetChange}
          value={selectedDatePreset}
        />
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
      {/* FIXME: this modal is shit */}
      <ModalWithButton
        insetValue="200px 350px"
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
