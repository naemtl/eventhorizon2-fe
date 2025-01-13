import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go";

import styles from "./Navbar.module.css";

function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className={styles.container}>
      <Link className={`${styles.branding} ${styles.link}`} to="/">
        <img className={styles.logo} src="/src/assets/logo-wh.png" alt="logo" />
        <h3 className={styles.title}>subscene mtl</h3>
      </Link>
      <div className={styles.controls}>
        <div className={styles.searchContainer}>
          <button className={styles.searchButton} title="Search">
            <GoSearch />
          </button>
          <label className={styles.label} htmlFor="search">
            Search by title
          </label>
          <input
            className={styles.input}
            title="Search"
            id="search"
            type="search"
          />
        </div>
        <Link className={styles.link} to="/about">
          {t("navbar.about")}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
