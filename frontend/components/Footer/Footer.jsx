import React from "react";
import styles from "./Footer.module.css";


export default function Footer() {
const currentYear = new Date().getFullYear();

return (
<footer className={styles.footer}>
<div className={styles.footer_section}>
<div className={styles.footer_subsection}>
    <span>© {currentYear} - HomeEats by Shuveksha Tuladhar</span>
</div>
</div>
</footer>
);
};

