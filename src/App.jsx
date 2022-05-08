import React from "react";
import { ReactDOM } from "react";
import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "lil-gui";
import "./App.css";

function App() {
  useEffect(() => {
    /**
     * Base
     */
    const parameters = {
      color: 0xff0000,
      spin: () => {
        gsap.to(mesh.rotation, 1, {
          y: mesh.rotation.y + Math.PI * 2,
          x: mesh.rotation.x + Math.PI / 2,
        });
        gsap.to(mesh1.rotation, 1, {
          y: mesh1.rotation.y + Math.PI * 2,
          x: mesh1.rotation.x + Math.PI / 2,
        });
      },
    };

    // Canvas
    const canvas = document.getElementById("webgl");

    // Scene
    const scene = new THREE.Scene();

    /**
     * Object
     */

    // Material - One image for each face of the cube
    const loader = new THREE.TextureLoader();
    loader.setPath("src/images/");

    const material2 = [
      new THREE.MeshBasicMaterial({ map: loader.load("4.png") }),
      new THREE.MeshBasicMaterial({ map: loader.load("4.jpg") }),
      new THREE.MeshBasicMaterial({ map: loader.load("5.jpg") }),
      new THREE.MeshBasicMaterial({ map: loader.load("7.jpg") }),
      new THREE.MeshBasicMaterial({ map: loader.load("8.jpg") }),
      new THREE.MeshBasicMaterial({ map: loader.load("9.jpg") }),
    ];

    //End
    const geometry = new THREE.BoxGeometry(10, 10, 10, 10, 10, 10);
    const geometry1 = new THREE.BoxGeometry(5, 5, 5, 10, 10, 10);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    const mesh1 = new THREE.Mesh(geometry1, material2);
    scene.add(mesh);
    scene.add(mesh1);

    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.z = 23;
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.maxDistance = 80;
    controls.minDistance = 10;

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // AxesHelper
    const axesHelper = new THREE.AxesHelper(590);
    scene.add(axesHelper);

    /**
     * Debug
     */
    const gui = new dat.GUI({
      // closed: true,
      width: 300,
    });
    // gui.hide()

    const cubeFolder = gui.addFolder("Cube 1");
    cubeFolder.add(mesh.position, "y").min(0).max(30).step(0.01).name("y");
    cubeFolder.add(mesh.position, "x").min(0).max(30).step(0.01).name("x");
    cubeFolder.add(mesh.position, "z").min(0).max(30).step(0.01).name("z");
    cubeFolder.add(mesh, "visible");
    cubeFolder.close();

    const cubeFolder2 = gui.addFolder("Cube 2");
    cubeFolder2.add(mesh1.position, "y").min(0).max(30).step(0.01).name("y");
    cubeFolder2.add(mesh1.position, "x").min(0).max(30).step(0.01).name("x");
    cubeFolder2.add(mesh1.position, "z").min(0).max(30).step(0.01).name("z");
    cubeFolder2.add(mesh1, "visible");
    cubeFolder2.close();
    console.log(mesh);
    gui.add(material, "wireframe");

    window.addEventListener("keydown", (event) => {
      if (event.key === "h") {
        if (gui._hidden) gui.show();
        else gui.hide();
      }
    });

    gui.addColor(parameters, "color").onChange(() => {
      material.color.set(parameters.color);
    });

    gui.add(parameters, "spin");

    /**
     * Animate
     */
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      mesh.rotation.x += 0.01;
      mesh1.rotation.x += -0.01;
      mesh.rotation.y += 0.005;
      mesh1.rotation.y += -0.005;
      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
    //END USEEFFECT
  }, []);

  return (
    <div>
      <canvas id="webgl"></canvas>
    </div>
  );
}

export default App;
