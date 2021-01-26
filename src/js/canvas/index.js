import * as THREE from "three";
import './../../css/base/canvas.scss'

import requestAnimationFrame from 'raf';
import Cube from "./objects/Cube";
import dat from 'dat-gui';
import 'gsap';

export default class Webgl {
  constructor(width, height) {
    this.params = {
      usePostprocessing: false,
    };

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    this.camera.position.z = 100;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x262626);
	document.body.appendChild(this.renderer.domElement);

    this.composer = null;
	this.initPostprocessing();
	
	this.addGui();
	this.addCube();
  }

  addGui() {
	this.gui = new dat.GUI();
	this.gui.add(this.params, 'usePostprocessing');
  }

  addCube() {
	this.cube = new Cube();
    this.cube.position.set(0, 0, 0);
    this.scene.add(this.cube);
  }

  initPostprocessing() {
    if (!this.params.usePostprocessing) {
      return;
    }

    /* Add the effect composer */
  }

  resize(width, height) {
    if (this.composer) {
      this.composer.setSize(width, height);
    }

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  render() {
    if (this.params.usePostprocessing) {
      console.warn("WebGL - No effect composer set.");
    } else {
      this.renderer.render(this.scene, this.camera);
    }

    this.cube.update();
  }
}

let webgl = new Webgl(window.innerWidth, window.innerHeight);

function animate() {
  requestAnimationFrame(animate);
  webgl.render();
}
animate();

// handle resize
window.addEventListener('resize', resizeHandler);
function resizeHandler() {
  webgl.resize(window.innerWidth, window.innerHeight);
}
