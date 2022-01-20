import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Labs</title>
        <meta
          name="description"
          content="A space for me to try out some cool web stuff"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Labs</h1>

        <p>A space for me to try out some cool web stuff</p>
      </main>

      <footer className={styles.footer}>
        <a href="https://github.com/WebManifestation/labs" target="_blank">
          GitHub Source
        </a>
      </footer>
    </div>
  );
}
