import Head from "next/head";
import { createRef, Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "stats.js";
import vertexShader from "../components/Shaders/functions-one-shader/vertex-shader.glsl";
import fragmentShader from "../components/Shaders/functions-one-shader/fragment-shader.glsl";

export default class functionsOneShader extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = createRef();
  }

  componentDidMount() {
    const stats = new Stats();
    stats.domElement.style.left = 0;
    stats.domElement.style.right = "initial";
    document.body.appendChild(stats.dom);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, 1, 1, 0, 0.1, 1000);
    // const camera = new THREE.PerspectiveCamera(
    //   75,
    //   window.innerWidth / window.innerHeight,
    //   0.1,
    //   1000
    // );
    camera.position.set(0, 0, 1);

    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;
    renderer.outputEncoding = THREE.sRGBEncoding;
    this.canvasRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enabled = false;

    this.threeVars = {
      scene,
      renderer,
      camera,
      controls,
      stats,
    };

    // this.addLights();

    // this.addObjects();

    this.addShader();

    this.animate();

    window.addEventListener("resize", this.onWindowResize.bind(this), false);
  }

  addShader() {
    const { scene } = this.threeVars;
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Vector4(1, 1, 0, 1) },
        color2: { value: new THREE.Vector4(0, 1, 1, 1) },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    const colors = [
      new THREE.Color(0xff0000),
      new THREE.Color(0x00ff00),
      new THREE.Color(0x0000ff),
      new THREE.Color(0x00ffff),
    ];

    const colorFloats = colors.map((c) => c.toArray()).flat();

    const geometry = new THREE.PlaneGeometry(1, 1);

    geometry.setAttribute(
      "testColors",
      new THREE.Float32BufferAttribute(colorFloats, 3)
    );
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(0.5, 0.5, 0);
    scene.add(plane);
  }

  addObjects() {
    const { scene } = this.threeVars;

    const color = new THREE.Color(`hsla(0, 80%, 50%, 1)`);

    const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: color });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    this.threeVars.cube = cube;
  }

  addLights() {
    const { scene } = this.threeVars;
    const ambient = new THREE.AmbientLight(0xffffff, 0.05);
    scene.add(ambient);

    const topRight = new THREE.DirectionalLight(0xffffff, 0.5);
    topRight.position.set(4, 4, 4);
    const topRightHelper = new THREE.DirectionalLightHelper(topRight, 1);
    scene.add(topRight);
    scene.add(topRightHelper);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(0, 2, -6);
    const backLightHelper = new THREE.DirectionalLightHelper(backLight, 1);
    scene.add(backLight);
    scene.add(backLightHelper);
  }

  animate() {
    const { scene, camera, renderer, controls, stats, cube } = this.threeVars;

    stats.begin();

    // cube.rotation.y += 0.01;
    // cube.rotation.x += 0.02;

    controls.update();

    renderer.render(scene, camera);

    requestAnimationFrame(this.animate.bind(this));

    stats.end();
  }

  onWindowResize() {
    if (this.threeVars) {
      const { camera, renderer } = this.threeVars;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  render() {
    return (
      <>
        <Head>
          <title>Basic - Labs</title>
          <meta name="description" content="Basic THREE.js scene" />
        </Head>
        <div ref={this.canvasRef}></div>
      </>
    );
  }
}
