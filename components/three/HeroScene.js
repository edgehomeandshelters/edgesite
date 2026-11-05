"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
function Building() {
  const slab = [
    [0, 0.4, 0, 5, 0.8, 3],
    [0.6, 1.3, 0.2, 4, 0.9, 2.6],
    [-0.4, 2.2, 0, 3.2, 0.9, 2.2],
  ];
  useFrame(({ pointer, camera }) => {
    camera.position.x += (pointer.x * 1.6 - camera.position.x) * 0.04;
    camera.position.y += (2.6 + pointer.y * 0.6 - camera.position.y) * 0.04;
    camera.lookAt(0, 1.4, 0);
  });
  return (
    <group>
      {slab.map(([x, y, z, w, h, d], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh castShadow>
            <boxGeometry args={[w, h, d]} />
            <meshStandardMaterial
              color={i % 2 ? "#d9d2c4" : "#8a7f70"}
              roughness={0.8}
            />
          </mesh>
          <mesh position={[0, 0, d / 2 + 0.01]}>
            <planeGeometry args={[w * 0.88, h * 0.6]} />
            <meshPhysicalMaterial
              color="#1c2024"
              roughness={0.05}
              metalness={0.6}
              clearcoat={1}
            />
          </mesh>
          <mesh position={[0, h / 2 + 0.04, 0]}>
            <boxGeometry args={[w + 0.3, 0.08, d + 0.3]} />
            <meshStandardMaterial
              color="#b8975a"
              metalness={0.8}
              roughness={0.35}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
export default function HeroScene() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 2.6, 9], fov: 38 }} shadows>
      <color attach="background" args={["#1c1b19"]} />
      <fog attach="fog" args={["#1c1b19", 10, 22]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 4]} intensity={2} castShadow />
      <Building />
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.6}
        scale={14}
        blur={2.5}
      />
      <Environment preset="sunset" />
    </Canvas>
  );
}
