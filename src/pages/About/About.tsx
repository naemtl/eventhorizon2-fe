import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();

  const questionsAndAnswers = [
    {
      question: t("faq.question"),
      answer: t("faq.answer"),
    },
    {
      question: t("faq.question"),
      answer: t("faq.answer"),
    },
    {
      question: t("faq.question"),
      answer: t("faq.answer"),
    },
  ];

  return <div>About</div>;
}

export default About;
