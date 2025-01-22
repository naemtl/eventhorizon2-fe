import { useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

import styles from "./AccordionItem.module.css";

function AccordionItem({ question, answer, isOpen, onClick }) {
  const contentHeight = useRef<HTMLDivElement>(null);
  return (
    <div className={styles.container}>
      <button
        className={`${styles.questionContainer} ${isOpen ? styles.open : ""}`}
        onClick={onClick}
      >
        <p className={styles.question}>{question}</p>
        <RiArrowDropDownLine
          className={`${styles.arrow} ${isOpen ? styles.open : ""}`}
        />
      </button>
      <div
        ref={contentHeight}
        className={styles.answerContainer}
        style={
          isOpen
            ? { height: contentHeight.current?.scrollHeight }
            : { height: "0px" }
        }
      >
        <p className={styles.answer}>{answer}</p>
      </div>
    </div>
  );
}

export default AccordionItem;
