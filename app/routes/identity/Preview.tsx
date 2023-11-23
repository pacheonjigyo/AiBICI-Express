/* eslint-disable react/no-unknown-property */

import * as React from "react";

import { OrbitControls, Sphere } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useObserver } from "mobx-react";
import { MeshStandardMaterial, TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { AppContext } from "../../stores/index.js";

function WolfMesh(props: any) {
  const { scene, materials } = useLoader(
    GLTFLoader,
    "/3d/starbucks_paper_cup_v5/papercup23.gltf",
  );

  const textLoader = new TextureLoader();
  const newTexture = textLoader.load(props.material);
  const newMaterial = new MeshStandardMaterial({
    map: props.material ? newTexture : undefined,
  });

  useFrame((state, delta, frame) => {
    const mesh = scene.children[0];

    scene.traverse((o) => {
      o.material = newMaterial;
    });
  });

  return useObserver(() => (
    <>
      <group position={[0, -1, 0]}>
        <primitive object={scene} scale={0.4} />
      </group>
    </>
  ));
}

export default function Preview() {
  const { canvasStore } = React.useContext(AppContext);

  return useObserver(() => (
    <Canvas>
      {/* 주변 조명 */}
      <ambientLight intensity={1} />

      {/* 햇빛 조명 */}
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* 안쪽 배경 (투명도 적용) */}
      <Sphere args={[48, 128, 128]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color={0x8265ff}
          side={2}
          transparent
          opacity={0.1}
        />
      </Sphere>

      <WolfMesh position={[0, 0, 0]} material={canvasStore.material} />

      <OrbitControls autoRotate />
    </Canvas>
  ));
}
