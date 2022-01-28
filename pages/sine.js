import Head from "next/head";
import { createRef, Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "stats.js";

export default class Sine extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = createRef();
    this.sinSegments = [];
    this.cosSegments = [];
  }

  componentDidMount() {
    const stats = new Stats();
    stats.domElement.style.right = 0;
    stats.domElement.style.left = "initial";
    document.body.appendChild(stats.dom);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 20);
    // camera.position.set(32, 0, 0);

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
      stats,
    };

    this.addLights();

    this.addObjects();

    this.animate();

    window.addEventListener("resize", this.onWindowResize.bind(this), false);
  }

  addObjects() {
    const { scene } = this.threeVars;

    const color = new THREE.Color(`hsla(0, 80%, 50%, 1)`);
    const colorAlt = new THREE.Color(`hsla(100, 80%, 50%, 1)`);

    const geometry = new THREE.SphereBufferGeometry(0.5, 32, 16);
    const material = new THREE.MeshLambertMaterial({ color: color });
    const materialAlt = new THREE.MeshLambertMaterial({ color: colorAlt });

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
    });

    const points = [];
    const pointsAlt = [];

    const twoPi = Math.PI * 2;
    const segments = 20;
    const spaceFactor = 6;

    const slice = twoPi / segments;

    this.threeVars = {
      ...this.threeVars,
      twoPi,
      segments,
      spaceFactor,
      slice,
    };

    for (let i = 0; i < segments; i++) {
      const position = slice * i;
      const x = position * spaceFactor - Math.PI * spaceFactor;
      const y = Math.sin(position) * spaceFactor;
      const z = Math.cos(position) * spaceFactor;

      const yAlt = Math.sin(position + Math.PI) * spaceFactor;
      const zAlt = Math.cos(position + +Math.PI) * spaceFactor;

      const sinSphere = new THREE.Mesh(geometry, material);
      sinSphere.position.x = x;
      sinSphere.position.y = y;
      sinSphere.position.z = z;

      const cosSphere = new THREE.Mesh(geometry, materialAlt);

      cosSphere.position.x = x;
      cosSphere.position.y = yAlt;
      cosSphere.position.z = zAlt;

      this.sinSegments.push(sinSphere);
      this.cosSegments.push(cosSphere);

      points.push(new THREE.Vector3(x, y, z));
      pointsAlt.push(new THREE.Vector3(x, yAlt, zAlt));

      scene.add(sinSphere);
      scene.add(cosSphere);
    }

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const lineGeometryAlt = new THREE.BufferGeometry().setFromPoints(pointsAlt);

    const line = new THREE.Line(lineGeometry, lineMaterial);
    const lineAlt = new THREE.Line(lineGeometryAlt, lineMaterial);
    this.threeVars.line = line;
    this.threeVars.lineAlt = lineAlt;
    scene.add(line);
    scene.add(lineAlt);
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

  animate(t) {
    const {
      scene,
      camera,
      renderer,
      controls,
      stats,
      twoPi,
      segments,
      spaceFactor,
      slice,
      line,
      lineAlt,
    } = this.threeVars;

    stats.begin();

    const points = [];
    const pointsAlt = [];

    if (t) {
      const secs = t / 500;
      for (let i = 0; i < this.sinSegments.length; i++) {
        const sinSphere = this.sinSegments[i];
        const cosSphere = this.cosSegments[i];
        const position = slice * i;

        const x = position * spaceFactor - Math.PI * spaceFactor;
        const y = Math.sin(secs + position) * spaceFactor;
        const z = Math.cos(secs - position) * spaceFactor;

        const yAlt = Math.sin(secs + position + Math.PI) * spaceFactor;
        const zAlt = Math.cos(secs - position + Math.PI) * spaceFactor;

        sinSphere.position.x = x;
        sinSphere.position.y = y;
        sinSphere.position.z = z;

        cosSphere.position.x = x;
        cosSphere.position.y = yAlt;
        cosSphere.position.z = zAlt;

        points.push(new THREE.Vector3(x, y, z));
        pointsAlt.push(new THREE.Vector3(x, yAlt, zAlt));
      }
    }

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const lineGeometryAlt = new THREE.BufferGeometry().setFromPoints(pointsAlt);

    line.geometry = lineGeometry;
    lineAlt.geometry = lineGeometryAlt;

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
          <title>Sine - Labs</title>
          <meta name="description" content="Fun with sine waves" />
        </Head>
        <div ref={this.canvasRef}></div>
      </>
    );
  }
}
