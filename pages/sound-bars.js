import Head from "next/head";
import { createRef, Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

class SoundBars extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = createRef();
    this.cubeList = [];
  }
  state = { isRecording: false };

  componentDidMount() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 24);

    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;
    renderer.outputEncoding = THREE.sRGBEncoding;
    this.canvasRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;

    this.threeVars = {
      scene,
      renderer,
      camera,
      controls,
    };

    this.addLights();
    this.addObjects();

    this.animate();
  }

  addObjects() {
    const { scene } = this.threeVars;

    const n = 8;
    const cubeSize = 1;

    const padding = 1;
    const offset = (n * (cubeSize + padding)) / 2 - cubeSize / 2 - padding / 2;
    const xOffset = offset;
    const yOffset = offset;

    for (let x = 0; x < n; x++) {
      for (let y = 0; y < n; y++) {
        const color = new THREE.Color(
          //   `hsla(${Math.floor(Math.random() * 255)}, 100%, 50%, 1)`
          //   `hsla(${Math.floor(64 * x)}, ${Math.floor(100 - 25 * y)}%, 50%, 1)`
          `hsla(${Math.floor((256 / n) * y)}, ${Math.floor(
            120 - (100 / n) * x
          )}%, 50%, 1)`
        );

        const geometry = new THREE.BoxBufferGeometry(
          cubeSize,
          cubeSize,
          cubeSize
        );
        const material = new THREE.MeshLambertMaterial({ color: color });
        const cube = new THREE.Mesh(geometry, material);

        cube.position.y = x - xOffset + padding * x;
        cube.position.x = y - yOffset + padding * y;

        cube.scale.set(0.5, 0.5, 0.5);

        scene.add(cube);

        this.cubeList.push(cube);
      }
    }
  }

  addLights() {
    const { scene } = this.threeVars;
    const ambient = new THREE.AmbientLight(0xffffff, 0.05);
    scene.add(ambient);

    const topRight = new THREE.DirectionalLight(0xffffff, 0.5);
    topRight.position.set(4, 4, 4);
    const topRightHelper = new THREE.DirectionalLightHelper(topRight, 1);
    scene.add(topRight);
    // scene.add(topRightHelper);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(0, 2, -6);
    const backLightHelper = new THREE.DirectionalLightHelper(backLight, 1);
    scene.add(backLight);
    // scene.add(backLightHelper);
  }

  async addAudioListener() {
    const { camera } = this.threeVars;
    const listener = new THREE.AudioListener();
    listener.gain.disconnect();
    camera.add(listener);
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    this.setState({
      isRecording: true,
    });

    const fftSize = 64 * 2;
    const audio = new THREE.Audio(listener);
    var context = listener.context;
    var source = context.createMediaStreamSource(audioStream);
    audio.setNodeSource(source);

    // audio.setVolume(0);

    const analyser = new THREE.AudioAnalyser(audio, fftSize);

    this.threeVars.analyser = analyser;
  }

  animate() {
    const { scene, camera, renderer, cubeList, controls, analyser } =
      this.threeVars;
    requestAnimationFrame(this.animate.bind(this));

    for (let i = 0; i < this.cubeList.length; i++) {
      const cube = this.cubeList[i];
      if (i % 2) {
        cube.rotation.x += 0.001 * (i + 1);
        cube.rotation.y += 0.001 * (i + 1);
      } else {
        cube.rotation.x -= 0.001 * (i + 1);
        cube.rotation.y -= 0.001 * (i + 1);
      }
      if (analyser) {
        const fqData = analyser.getFrequencyData();
        const fqAvgData = analyser.getAverageFrequency();
        cube.scale.x = 0.3 + fqData[i] / 250;
        cube.scale.y = 0.3 + fqData[i] / 250;
        cube.scale.z = 0.3 + fqData[i] / 250;
        controls.autoRotateSpeed = fqAvgData * 0.1;
      }
    }

    controls.update();

    renderer.render(scene, camera);
  }
  render() {
    return (
      <>
        <Head>
          <title>Sound Bars - Labs</title>
          <meta name="description" content="Bars that react to audio" />
        </Head>
        <div ref={this.canvasRef}></div>
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "hsla(0, 0%, 0%, 0.25)",
            opacity: this.state.isRecording ? 0 : 1,
            pointerEvents: this.state.isRecording ? "none" : "all",
            transition: "opacity 0.25s ease-in-out",
          }}
        >
          <div
            style={{
              background: "chocolate",
              color: "white",
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: 20,
            }}
            onClick={() => {
              this.addAudioListener();
            }}
          >
            Start listening
          </div>
        </div>
      </>
    );
  }
}

export default SoundBars;
