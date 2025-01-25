import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Accordion } from "@szhsin/react-accordion";

import AccordionItem from "./AccordionItem/AccordionItem";

import styles from "./About.module.css";

function About() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("about.title")}</h1>
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
      </Accordion>
    </div>
  );
}

export default memo(About);
