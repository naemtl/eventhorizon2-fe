import { useTranslation } from "react-i18next";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";

import styles from "./About.module.css";

import "./Accordion.css";

function About() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("about.title")}</h1>
      <Accordion>
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

export default About;
