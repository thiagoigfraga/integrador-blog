import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <h3>Tudo do que o mundo pode oferecer.</h3>
      <p>Blog &copy; 2022</p>
    </footer>
  );
}
