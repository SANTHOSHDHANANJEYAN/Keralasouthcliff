'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

type FloatingElementProps = {
  position: [number, number, number];
  color: string;
  shape?: 'sphere' | 'box' | 'torus';
};

const FloatingElement: React.FC<FloatingElementProps> = ({ position, color, shape = 'sphere' }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  // Use mesh primitive instead of drei components to avoid ref forwarding issues
  if (shape === 'box') {
    return (
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={color} transparent opacity={0.7} />
      </mesh>
    );
  } else if (shape === 'torus') {
    return (
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.3, 0.1, 16, 32]} />
        <meshStandardMaterial color={color} transparent opacity={0.7} />
      </mesh>
    );
  }
  
  // Default sphere
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.3]} />
      <meshStandardMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
};

type FloatingElementsProps = {
  className?: string;
};

const FloatingElements: React.FC<FloatingElementsProps> = ({ className = '' }) => {
  const elements: FloatingElementProps[] = [
    { position: [-3, 2, -2], color: '#3B82F6', shape: 'sphere' },
    { position: [3, 1, -1], color: '#10B981', shape: 'box' },
    { position: [0, 3, -3], color: '#F59E0B', shape: 'torus' },
    { position: [-2, 1, 1], color: '#8B5CF6', shape: 'sphere' },
    { position: [2, 2, 2], color: '#EF4444', shape: 'box' },
  ];

  return (
    <div className={`w-full h-48 ${className}`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        {elements.map((element, index) => (
          <FloatingElement key={index} {...element} />
        ))}
      </Canvas>
    </div>
  );
};

export default FloatingElements;
