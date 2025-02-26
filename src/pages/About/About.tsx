import { Accordion } from '@szhsin/react-accordion';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './About.module.css';

import AccordionItem from './AccordionItem/AccordionItem.tsx';

function About() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <h2 className={styles.title}>{t('about.title')}</h2>
        <p className={styles.description}>
          <span>
            <strong>subscene mtl</strong>
          </span>
          <span>
            {' '}
            {t('about.description')}
          </span>
        </p>
      </section>
      <section className={styles.faqContainer}>
        <h3 className={styles.title}>{t('faq.title')}</h3>
        <Accordion
          className={styles.accordion}
          transition
          transitionTimeout={250}
        >
          <AccordionItem header={t('faq.question-1')}>
            {t('faq.answer-1')}
          </AccordionItem>
          <AccordionItem header={t('faq.question-2')}>
            {t('faq.answer-2')}
          </AccordionItem>
          <AccordionItem header={t('faq.question-3')}>
            {t('faq.answer-3')}
          </AccordionItem>
          <AccordionItem header={t('faq.question-4')}>
            {t('faq.answer-4')}
          </AccordionItem>
          <AccordionItem header={t('faq.question-5')}>
            {t('faq.answer-5')}
          </AccordionItem>
        </Accordion>
      </section>
      <section className={styles.contactContainer}>
        <h3 className={styles.title}>{t('about.contact')}</h3>
        <span>{t('about.contact-text')}</span>
        <a href="mailto:ms@subscenemtl.net">ms@subscenemtl.net</a>
      </section>
    </div>
  );
}

export default memo(About);
