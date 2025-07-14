'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

const Villa3DStructure = ({ isGroundFloor = true }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group 
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      {/* Main Villa Structure */}
      <Box args={[4, 2, 3]} position={[0, 0, 0]}>
        <meshStandardMaterial color={hovered ? "#3B82F6" : "#8B5CF6"} />
      </Box>
      
      {/* Roof */}
      <Box args={[4.5, 0.3, 3.5]} position={[0, 1.15, 0]}>
        <meshStandardMaterial color="#DC2626" />
      </Box>
      
      {/* Terrace/Balcony */}
      <Box args={[2, 0.1, 1]} position={isGroundFloor ? [2.5, -0.5, 0] : [2.5, 1.5, 0]}>
        <meshStandardMaterial color="#059669" />
      </Box>
      
      {/* Pillars */}
      <Cylinder args={[0.1, 0.1, 2]} position={[2, isGroundFloor ? -0.5 : 0.5, 0.5]}>
        <meshStandardMaterial color="#374151" />
      </Cylinder>
      <Cylinder args={[0.1, 0.1, 2]} position={[2, isGroundFloor ? -0.5 : 0.5, -0.5]}>
        <meshStandardMaterial color="#374151" />
      </Cylinder>
      
      {/* Windows */}
      <Box args={[0.1, 0.8, 0.6]} position={[-1.95, 0.2, 0.8]}>
        <meshStandardMaterial color="#60A5FA" transparent opacity={0.7} />
      </Box>
      <Box args={[0.1, 0.8, 0.6]} position={[-1.95, 0.2, -0.8]}>
        <meshStandardMaterial color="#60A5FA" transparent opacity={0.7} />
      </Box>
      
      {/* Door */}
      <Box args={[0.1, 1.5, 0.8]} position={[1.95, -0.25, 0]}>
        <meshStandardMaterial color="#92400E" />
      </Box>
      
      {/* Beach Elements */}
      <Sphere args={[0.3]} position={[-6, -1, 2]}>
        <meshStandardMaterial color="#FCD34D" />
      </Sphere>
      <Cylinder args={[0.1, 0.1, 3]} position={[-6, 0.5, 2]}>
        <meshStandardMaterial color="#065F46" />
      </Cylinder>
      
      {/* Text Label */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.5}
        color="#1F2937"
        anchorX="center"
        anchorY="middle"
      >
        {isGroundFloor ? "Ground Floor Villa" : "Top Floor Villa"}
      </Text>
    </group>
  );
};

const Villa3DModel = ({ isGroundFloor = true, className = "" }) => {
  return (
    <div className={`w-full h-96 ${className}`}>
      <Canvas camera={{ position: [8, 5, 8], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Villa3DStructure isGroundFloor={isGroundFloor} />
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          enableRotate={true}
          maxDistance={15}
          minDistance={5}
        />
      </Canvas>
    </div>
  );
};

export default Villa3DModel;