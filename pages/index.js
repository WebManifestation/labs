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
            window.location = "/basic";
          }}
          className={styles.card}
        >
          <h2>Basic Scene</h2>
          <p>A cube with two directional lights.</p>
        </section>
				
        <section
          onClick={() => {
            window.location = "/sine";
          }}
          className={styles.card}
        >
          <h2>Trippy Sine</h2>
          <p>Some trippy moving sine waves in 3D</p>
        </section>

        <section
          onClick={() => {
            window.location = "/sound-bars";
          }}
          className={styles.card}
        >
          <h2>Sound Bars</h2>
          <p>3D cubes that react to sound from the mic</p>
        </section>

        <section
          onClick={() => {
            window.location = "/colors-shader";
          }}
          className={styles.card}
        >
          <h2>Colors Shader</h2>
          <p>Simon dev shader tutorial Section 2</p>
        </section>

        <section
          onClick={() => {
            window.location = "/textures-shader";
          }}
          className={styles.card}
        >
          <h2>Textures Shader</h2>
          <p>Simon dev shader tutorial Section 3</p>
        </section>

        <section
          onClick={() => {
            window.location = "/functions-one-shader";
          }}
          className={styles.card}
        >
          <h2>Shader functions 1</h2>
          <p>Simon dev shader tutorial Section 4 part one</p>
        </section>

        <section
          onClick={() => {
            window.location = "/functions-two-shader";
          }}
          className={styles.card}
        >
          <h2>Shader functions 2</h2>
          <p>Simon dev shader tutorial Section 4 part two</p>
        </section>

        <section
          onClick={() => {
            window.location = "/functions-three-shader";
          }}
          className={styles.card}
        >
          <h2>Shader functions 3</h2>
          <p>Simon dev shader tutorial Section 4 part three</p>
        </section>
      </main>
    </>
  );
}
