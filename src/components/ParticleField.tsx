'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 2000 }) {
  const mesh = useRef<THREE.Points>(null!);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      
      // Mix of red and silver particles
      if (Math.random() > 0.85) {
        colors[i * 3] = 0.88;     // R
        colors[i * 3 + 1] = 0.02; // G
        colors[i * 3 + 2] = 0.0;  // B
      } else {
        const gray = 0.3 + Math.random() * 0.3;
        colors[i * 3] = gray;
        colors[i * 3 + 1] = gray;
        colors[i * 3 + 2] = gray;
      }
    }
    
    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.03;
      
      // Subtle floating motion
      mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function GridFloor() {
  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <gridHelper args={[100, 100, '#E10600', '#1a1a1a']} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  );
}

function FloatingRing() {
  const ringRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={ringRef} position={[8, 0, -5]}>
      <torusGeometry args={[3, 0.05, 16, 100]} />
      <meshBasicMaterial color="#E10600" transparent opacity={0.4} />
    </mesh>
  );
}

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 60 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <Particles count={1500} />
      <FloatingRing />
      <GridFloor />
      <fog attach="fog" args={['#0a0a0a', 10, 50]} />
    </Canvas>
  );
}
