import type { GoToTopButtonProps } from './GoToTopButton.types.ts';
import { useTranslation } from 'react-i18next';
import { IoChevronUpCircleSharp } from 'react-icons/io5';

import styles from './GoToTopButton.module.css';

function GoToTopButton({ showButton, handleScrollToTop }: GoToTopButtonProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <button className={showButton ? styles.button : styles.hide} onClick={handleScrollToTop} type="button" title={t('go-to-top')}>
        <IoChevronUpCircleSharp />
      </button>
    </div>
  );
}

export default GoToTopButton;
