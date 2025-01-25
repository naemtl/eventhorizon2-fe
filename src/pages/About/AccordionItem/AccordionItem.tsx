import { memo } from "react";
import { AccordionItem as Item } from "@szhsin/react-accordion";
import { GoChevronDown } from "react-icons/go";

import styles from "./AccordionItem.module.css";

interface AccordionItemProps {
  children: React.ReactNode;
  header: string;
}

const AccordionItem = ({ header, ...rest }: AccordionItemProps) => (
  <Item
    {...rest}
    header={
      <>
        {header}
        <GoChevronDown className={styles.chevron} />
      </>
    }
    className={styles.item}
    buttonProps={{
      className: ({ isEnter }) =>
        `${styles.itemBtn} ${isEnter && styles.itemBtnExpanded}`,
    }}
    contentProps={{ className: styles.itemContent }}
    panelProps={{ className: styles.itemPanel }}
  />
);

export default memo(AccordionItem);
