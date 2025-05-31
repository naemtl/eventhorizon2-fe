import type { Option } from 'src/types/index.js';
import { Link } from '@tanstack/react-router';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCircleInfo, FaPiggyBank } from 'react-icons/fa6';

import Select from 'react-select';

import styles from './Navbar.module.css';

function Navbar() {
  const { i18n, t } = useTranslation();

  const options = useMemo(
    () => [
      { value: 'en', label: 'en' },
      { value: 'fr', label: 'fr' },
      { value: 'es', label: 'es' },
    ],
    [],
  );

  const [selectedLocale, setSelectedLocale] = useState(() => {
    const initialLocale = options.find(option => option.value === i18n.language);
    return initialLocale ?? options[0];
  });

  const handleLocaleChange = useCallback(
    (selectedOption: Option | null) => {
      setSelectedLocale(selectedOption ?? options[0]);
      i18n.changeLanguage(selectedOption?.value ?? options[0]!.value);
    },
    [i18n, options],
  );

  useEffect(() => {
    const selectedLocaleAsOption = options.find(option => option.value === i18n.language);
    if (selectedLocaleAsOption && selectedLocaleAsOption.value !== selectedLocale?.value) {
      setSelectedLocale(selectedLocaleAsOption); // TODO: this is discouraged
    }
  }, [i18n.language, options, selectedLocale]);

  return (
    <nav className={styles.container}>
      <Link className={`${styles.branding} ${styles.link}`} to="/">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
        <h3 className={styles.title}>subscene mtl</h3>
      </Link>
      <div className={styles.controls}>
        <Link className={styles.controlsLink} to="/about">
          <FaCircleInfo />
        </Link>
        <a aria-label={`${t('navbar.donate')} Subscene MTL`} className={`${styles.controlsLink} ${styles.donate}`} title={`${t('navbar.donate')} Subscene MTL`} href="https://ko-fi.com/N4N11BE9JJ" target="_blank" rel="noreferrer noopener">
          <FaPiggyBank />
        </a>
        <Select
          aria-label={t('navbar.change-language')}
          defaultValue={selectedLocale}
          onChange={handleLocaleChange}
          options={options}
          isSearchable={false}
          styles={{
            control: baseStyles => ({
              ...baseStyles,
              'cursor': 'pointer',
              'backgroundColor': 'var(--black)',
              'border': '1px solid var(--black)',
              'boxShadow': 'none',
              'fontSize': 'var(--text-sm)',
              '&:hover': {
                border: '1px solid var(--white)',
              },
            }),
            menu: baseStyles => ({
              ...baseStyles,
              backgroundColor: 'var(--black)',
              border: '1px solid var(--white)',
              borderRadius: '5px',
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
    </nav>
  );
}

export default memo(Navbar);
