import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SceneCanvasProps {
  progressRef: React.MutableRefObject<number>;
  mousePosRef: React.MutableRefObject<{ x: number; y: number }>;
}

const MorphingCubeGroup: React.FC<{
  progressRef: React.MutableRefObject<number>;
  mousePosRef: React.MutableRefObject<{ x: number; y: number }>;
}> = ({ progressRef, mousePosRef }) => {
  const groupRef = useRef<THREE.Group>(null);
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);

  // Subdivided base box geometries (20 subdivisions per side for butter-smooth 60fps)
  const subdivisions = 20;

  const { outerBasePos, outerBaseNorm, outerGeom, innerBasePos, innerGeom, edgesGeom, vertexCount } =
    useMemo(() => {
      const oGeom = new THREE.BoxGeometry(2.1, 2.1, 2.1, subdivisions, subdivisions, subdivisions);
      const iGeom = new THREE.BoxGeometry(1.25, 1.25, 1.25, subdivisions, subdivisions, subdivisions);
      const eGeom = new THREE.EdgesGeometry(new THREE.BoxGeometry(2.102, 2.102, 2.102));

      const oPos = oGeom.attributes.position.array as Float32Array;
      const oNorm = oGeom.attributes.normal.array as Float32Array;
      const iPos = iGeom.attributes.position.array as Float32Array;

      return {
        outerGeom: oGeom,
        innerGeom: iGeom,
        edgesGeom: eGeom,
        outerBasePos: new Float32Array(oPos),
        outerBaseNorm: new Float32Array(oNorm),
        innerBasePos: new Float32Array(iPos),
        vertexCount: oPos.length / 3
      };
    }, []);

  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  useFrame(() => {
    const scrollProgress = progressRef.current;

    // WebGL Budget: pause mesh computation when offscreen
    if (scrollProgress > 0.25) {
      if (groupRef.current && groupRef.current.visible) {
        groupRef.current.visible = false;
      }
      return;
    }

    const time = performance.now() * 0.001;
    const mousePos = mousePosRef.current;

    // 1. Calculate merge / complete progress:
    // At scroll 0 (Hero): mergeProgress = 0 (fluid rounded breathing cube)
    // As user scrolls 0 to 0.14: mergeProgress approaches 1 (edges solidify into sharp cube)
    const mergeProgress = Math.min(Math.max(scrollProgress / 0.14, 0), 1);
    const fluidWobbleAmp = (1 - mergeProgress) * 0.11;

    // Overall scale:
    let currentScale = 1.0;
    if (scrollProgress < 0.08) {
      const p = scrollProgress / 0.08;
      currentScale = 1.0 + Math.sin(p * Math.PI) * 0.1;
    } else if (scrollProgress >= 0.08 && scrollProgress <= 0.20) {
      const p = (scrollProgress - 0.08) / 0.12;
      currentScale = THREE.MathUtils.lerp(1.05, 0.78, p);
    } else if (scrollProgress > 0.20 && scrollProgress <= 0.24) {
      const p = (scrollProgress - 0.20) / 0.04;
      currentScale = THREE.MathUtils.lerp(0.78, 0.0, Math.min(p, 1));
    } else if (scrollProgress > 0.24) {
      currentScale = 0.0;
    }

    if (groupRef.current) {
      groupRef.current.scale.set(currentScale, currentScale, currentScale);
      groupRef.current.visible = currentScale > 0.001;

      targetRotation.current.y = mousePos.x * 0.65;
      targetRotation.current.x = -mousePos.y * 0.5;

      currentRotation.current.x = THREE.MathUtils.lerp(
        currentRotation.current.x,
        targetRotation.current.x,
        0.08
      );
      currentRotation.current.y = THREE.MathUtils.lerp(
        currentRotation.current.y,
        targetRotation.current.y,
        0.08
      );

      groupRef.current.rotation.x = currentRotation.current.x + time * 0.25;
      groupRef.current.rotation.y = currentRotation.current.y + time * 0.38;
      groupRef.current.rotation.z = Math.sin(time * 0.4) * 0.08;
    }

    if (currentScale <= 0.001) return;

    const outerPos = outerGeom.attributes.position.array as Float32Array;
    const innerPos = innerGeom.attributes.position.array as Float32Array;

    for (let i = 0; i < vertexCount; i++) {
      const idx = i * 3;
      const bx = outerBasePos[idx];
      const by = outerBasePos[idx + 1];
      const bz = outerBasePos[idx + 2];

      const nx = outerBaseNorm[idx];
      const ny = outerBaseNorm[idx + 1];
      const nz = outerBaseNorm[idx + 2];

      const wave =
        Math.sin(time * 2.5 + bx * 2.2 + by * 2.0) *
        Math.cos(time * 2.0 + bz * 2.2) *
        fluidWobbleAmp;

      outerPos[idx] = bx + nx * wave;
      outerPos[idx + 1] = by + ny * wave;
      outerPos[idx + 2] = bz + nz * wave;

      const ibx = innerBasePos[idx];
      const iby = innerBasePos[idx + 1];
      const ibz = innerBasePos[idx + 2];

      const innerWave = wave * 0.85;
      innerPos[idx] = ibx + nx * innerWave;
      innerPos[idx + 1] = iby + ny * innerWave;
      innerPos[idx + 2] = ibz + nz * innerWave;
    }

    outerGeom.attributes.position.needsUpdate = true;
    outerGeom.computeVertexNormals();

    innerGeom.attributes.position.needsUpdate = true;
    innerGeom.computeVertexNormals();
  });

  return (
    <group ref={groupRef}>
      {/* Outer Shell: Translucent Frosted Glass Cube */}
      <mesh ref={outerMeshRef} geometry={outerGeom}>
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.48}
          roughness={0.08}
          metalness={0.05}
          transmission={0.88}
          ior={1.48}
          reflectivity={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.06}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Geometric Edge Accent: Clean architectural wireframe lines */}
      <lineSegments geometry={edgesGeom}>
        <lineBasicMaterial color="#0c0c0e" transparent opacity={0.75} />
      </lineSegments>

      {/* Inner Core: Hot Electric Safety Orange Cube */}
      <mesh ref={innerMeshRef} geometry={innerGeom}>
        <meshStandardMaterial
          color="#F0561F"
          roughness={0.15}
          metalness={0.15}
          emissive="#F0561F"
          emissiveIntensity={0.65}
        />
      </mesh>
    </group>
  );
};

export const CinematicCanvas: React.FC<SceneCanvasProps> = ({ progressRef, mousePosRef }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[15] w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={1.6} />
        <directionalLight position={[6, 8, 6]} intensity={2.8} color="#ffffff" />
        <directionalLight position={[-6, -4, -4]} intensity={1.4} color="#F0561F" />
        <pointLight position={[0, 0, 0]} intensity={2.2} color="#F0561F" distance={6} />
        <MorphingCubeGroup progressRef={progressRef} mousePosRef={mousePosRef} />
      </Canvas>
    </div>
  );
};

export default CinematicCanvas;
