import Image from "next/image";
import styles from "./Navigation.module.css";

function Navigation() {
  return (
    <nav className={styles.navbar}>
      <h1>Labs</h1>
      <a href="https://github.com/WebManifestation/labs">
        <Image alt="github" src="/github-icon.png" width={32} height={32} />
      </a>
    </nav>
  );
}

export default Navigation;
