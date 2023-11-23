import { Box } from "@mui/material";
import { fabric } from "fabric";

import * as React from "react";
import * as THREE from "three";

import "./test.css";

export function Test(props: any) {
  React.useEffect(() => {
    console.clear();
    console.log("starting scripts...");

    /**
     * Fabricjs
     * @type {fabric}
     */

    const canvas = new fabric.Canvas("canvas");
    canvas.backgroundColor = "#FFBE9F";

    const rectangle = new fabric.Rect({
      top: 100,
      left: 100,
      fill: "#FF6E27",
      width: 100,
      height: 100,
      transparentCorners: false,
      centeredScaling: true,
      borderColor: "black",
      cornerColor: "black",
      corcerStrokeColor: "black",
    });

    canvas.add(rectangle);

    /**
     * Threejs
     */

    const containerHeight = "512";
    const containerWidth = "512";
    let camera, renderer, container, scene, texture, material, geometry, cube;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const onClickPosition = new THREE.Vector2();

    init();
    animate();

    /**
     * Configurator init function
     */

    function init() {
      /**
       * Camera
       */

      camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth / window.innerHeight,
        0.01,
        100,
      );
      camera.position.set(0, 0, 3.5);

      /**
       * Renderer
       */

      container = document.getElementById("renderer");
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(containerWidth, containerHeight);
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      container.appendChild(renderer.domElement);

      /**
       * Scene
       */

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);

      /**
       * Texture and material
       */

      const canvas = document.getElementById("canvas");

      if (canvas) {
        texture = new THREE.Texture(canvas);
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        material = new THREE.MeshBasicMaterial({ map: texture });
      }

      /**
       * Model
       */

      geometry = new THREE.BoxGeometry(1, 1, 1);
      cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
    }

    /**
     * Configurator frame render function
     */

    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.004;
      cube.rotation.y += 0.001;
      texture.needsUpdate = true;

      renderer.render(scene, camera);
    }

    /**
     * Listeners
     */

    container.addEventListener("mousedown", onMouseClick, false);

    /**
     * Other methods
     */

    function onMouseClick(evt) {
      evt.preventDefault();

      const array = getMousePosition(container, evt.clientX, evt.clientY);
      onClickPosition.fromArray(array);

      const intersects: any = getIntersects(onClickPosition, scene.children);

      if (intersects.length > 0 && intersects[0].uv) {
        const uv = intersects[0].uv;
        intersects[0].object.material.map.transformUv(uv);

        const circle = new fabric.Circle({
          radius: 3,
          left: getRealPosition("x", uv.x),
          top: getRealPosition("y", uv.y),
          fill: "red",
        });
        canvas.add(circle);
      }
    }

    function getRealPosition(axis, value) {
      const CORRECTION_VALUE = axis === "x" ? 4.5 : 5.5;

      return Math.round(value * 512) - CORRECTION_VALUE;
    }

    const getMousePosition = function (dom, x, y) {
      const rect = dom.getBoundingClientRect();
      return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
    };

    const getIntersects = function (point, objects) {
      mouse.set(point.x * 2 - 1, -(point.y * 2) + 1);
      raycaster.setFromCamera(mouse, camera);
      return raycaster.intersectObjects(objects);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <div id="c-left">
          <h3>Renderer</h3>
          <div id="renderer"></div>
        </div>

        <div id="c-right">
          <h3>Canvas</h3>
          <canvas id="canvas" width="512" height="512"></canvas>
        </div>
      </Box>
    </>
  );
}
