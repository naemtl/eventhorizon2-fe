import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";

function Navbar() {
  const { i18n, t } = useTranslation();

  return (
    <nav className={styles.container}>
      <Link className={`${styles.branding} ${styles.link}`} to="/">
        <img className={styles.logo} src="/src/assets/logo-wh.png" alt="logo" />
        <h3 className={styles.title}>subscene mtl</h3>
      </Link>
      <div className={styles.controls}>
        <Link className={styles.link} to="/about">
          {t("navbar.about")}
        </Link>
        <div>
          <select
            title="language"
            onChange={(e) => i18n.changeLanguage(e.target.value)}
          >
            <option value="en">en</option>
            <option value="fr">fr</option>
          </select>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
