import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Accordion } from "@szhsin/react-accordion";

import AccordionItem from "./AccordionItem/AccordionItem";

import styles from "./About.module.css";

function About() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <h2 className={styles.title}>{t("about.title")}</h2>
        <p className={styles.description}>{t("about.description")}</p>
      </section>
      <section className={styles.faqContainer}>
        <h3 className={styles.title}>{t("faq.title")}</h3>
        <Accordion
          className={styles.accordion}
          transition
          transitionTimeout={250}
        >
          <AccordionItem header={t("faq.question")}>
            {t("faq.answer")}
          </AccordionItem>
          <AccordionItem header={t("faq.question")}>
            {t("faq.answer")}
          </AccordionItem>
          <AccordionItem header={t("faq.question")}>
            {t("faq.answer")}
          </AccordionItem>
          <AccordionItem header={t("faq.question")}>
            {t("faq.answer")}
          </AccordionItem>
          <AccordionItem header={t("faq.question")}>
            {t("faq.answer")}
          </AccordionItem>
        </Accordion>
      </section>
      <section className={styles.contactContainer}>
        <h3 className={styles.title}>{t("about.contact")}</h3>
        <span>{t("about.contact-text")}</span>
        <a href="mailto:ms@subscenemtl.net">ms@subscenemtl.net</a>
      </section>
    </div>
  );
}

export default memo(About);
