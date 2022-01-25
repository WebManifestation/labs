import Head from "next/head";
import Navigation from "../components/Navigation";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Labs</title>
        <meta
          name="description"
          content="A space for me to try out some cool web stuff"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <p className={styles.description}>
        A space for me to try out some cool web stuff
      </p>

      <main className={styles.main}>
        <section
          onClick={() => {
            window.location = "/sound-bars";
          }}
          className={styles.card}
        >
          <h2>Sound Bars</h2>
          <p>3D cubes that react to sound from the mic.</p>
        </section>
      </main>
    </>
  );
}
