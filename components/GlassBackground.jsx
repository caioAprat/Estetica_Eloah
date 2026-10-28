"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";

const ORBS = [
  { pos: [-3.4, 1.6, -1], r: 1.5, depth: 0.5 },
  { pos: [3.6, -0.4, -2], r: 2.1, depth: 0.8 },
  { pos: [0.4, -3.2, 0], r: 0.9, depth: 1.2 },
  { pos: [-2.6, -5.5, -1.5], r: 1.7, depth: 0.7 },
];

function Orb({ pos, r, depth }) {
  return (
    <Float speed={1.1} rotationIntensity={0.3} floatIntensity={1.2}>
      <mesh position={pos} scale={r}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          color="#f6e4da"
          roughness={0.04}
          metalness={0}
          transmission={1}
          thickness={1.4}
          ior={1.35}
          clearcoat={1}
          clearcoatRoughness={0.05}
          transparent
          opacity={0.9}
          envMapIntensity={1.4}
        />
      </mesh>
    </Float>
  );
}

function Rig() {
  const group = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const docH = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = scrollY / docH;

    // as esferas sobem mais devagar que a página e deslocam levemente com o mouse
    mouse.current.x += (state.pointer.x - mouse.current.x) * Math.min(delta * 2, 1);
    mouse.current.y += (state.pointer.y - mouse.current.y) * Math.min(delta * 2, 1);
    g.position.y += (progress * 6 - g.position.y) * Math.min(delta * 3, 1);
    g.rotation.y = mouse.current.x * 0.15;
    g.rotation.x = -mouse.current.y * 0.08;
  });

  return (
    <group ref={group}>
      {ORBS.map((o, i) => (
        <Orb key={i} {...o} />
      ))}
    </group>
  );
}

export default function GlassBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 5, 6]} intensity={1.4} color="#fff3ea" />
        {/* Environment procedural: sem downloads externos */}
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={3} color="#fff4ec" position={[0, 5, -5]} scale={[12, 3, 1]} />
          <Lightformer form="rect" intensity={2} color="#f0cdbd" position={[-6, 0, 2]} scale={[2, 8, 1]} />
          <Lightformer form="ring" intensity={2} color="#ffffff" position={[5, 1, 3]} scale={3} />
        </Environment>
        <Rig />
      </Canvas>
    </div>
  );
}
