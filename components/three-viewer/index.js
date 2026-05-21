import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class ThreeViewerComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML() {
    return `<div id="three-viewer" class="three-viewer mb-3"></div>`;
  }

  render(fileName) {
    this.parent.insertAdjacentHTML("beforeend", this.getHTML());
    this.init(fileName);
  }

  init(fileName) {
    const container = document.getElementById("three-viewer");
    const width = container.clientWidth;
    const height = 320;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    const camera = new THREE.PerspectiveCamera(10, width / height, 0.1, 1000);
    camera.position.set(0, 1, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const light = new THREE.HemisphereLight(0xffffff, 0x333333, 1);
    scene.add(light);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const loader = new GLTFLoader();
    loader.load(
      "./models/" + fileName,
      function (gltf) {
        scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error("Не удалось загрузить модель:", error);
      }
    );

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }
}
