import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Box, Plane } from '@react-three/drei';
import * as THREE from 'three';
import { FloorPlanData, Room, Wall } from '../types';

interface FloorPlan3DProps {
  floorPlanData: FloorPlanData;
  wallHeight: number;
  wallThickness: number;
}

// 部屋コンポーネント
const RoomMesh: React.FC<{ room: Room }> = ({ room }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // 微細な浮遊アニメーション
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <group>
      {/* 床 */}
      <Plane
        ref={meshRef}
        args={[room.bounds.width / 100, room.bounds.height / 100]}
        position={[
          room.bounds.x / 100 + room.bounds.width / 200,
          0,
          room.bounds.y / 100 + room.bounds.height / 200,
        ]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color={room.color} />
      </Plane>
      
      {/* 部屋名のラベル */}
      <Text
        position={[
          room.bounds.x / 100 + room.bounds.width / 200,
          room.height / 100 + 0.1,
          room.bounds.y / 100 + room.bounds.height / 200,
        ]}
        fontSize={0.3}
        color="#333"
        anchorX="center"
        anchorY="middle"
      >
        {room.name}
      </Text>
    </group>
  );
};

// 壁コンポーネント
const WallMesh: React.FC<{ wall: Wall }> = ({ wall }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const wallGeometry = useMemo(() => {
    const length = Math.sqrt(
      Math.pow(wall.end.x - wall.start.x, 2) + 
      Math.pow(wall.end.y - wall.start.y, 2)
    );
    return [length / 100, wall.height / 100, wall.thickness / 100];
  }, [wall]);

  const position = useMemo(() => [
    (wall.start.x + wall.end.x) / 200,
    wall.height / 200,
    (wall.start.y + wall.end.y) / 200,
  ], [wall]);

  const rotation = useMemo(() => [
    0,
    Math.atan2(wall.end.y - wall.start.y, wall.end.x - wall.start.x),
    0,
  ], [wall]);

  return (
    <Box
      ref={meshRef}
      args={wallGeometry}
      position={position}
      rotation={rotation}
    >
      <meshStandardMaterial color="#d0d0d0" />
    </Box>
  );
};

// カメラコントローラー
const CameraController: React.FC = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(5, 8, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
};

// メインの3Dシーンコンポーネント
const Scene: React.FC<{ floorPlanData: FloorPlanData }> = ({ floorPlanData }) => {
  return (
    <>
      <CameraController />
      
      {/* 環境光 */}
      <ambientLight intensity={0.6} />
      
      {/* 指向性ライト */}
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* ポイントライト */}
      <pointLight position={[-10, 10, -10]} intensity={0.5} />
      
      {/* 部屋を描画 */}
      {floorPlanData.rooms.map((room) => (
        <RoomMesh key={room.id} room={room} />
      ))}
      
      {/* 壁を描画 */}
      {floorPlanData.walls.map((wall) => (
        <WallMesh key={wall.id} wall={wall} />
      ))}
      
      {/* グリッド */}
      <gridHelper args={[20, 20, '#888888', '#444444']} />
      
      {/* オービットコントロール */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={2}
        maxDistance={20}
      />
    </>
  );
};

export const FloorPlan3D: React.FC<FloorPlan3DProps> = ({ floorPlanData }) => {
  return (
    <div style={{ width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden' }}>
      <Canvas
        shadows
        camera={{ position: [5, 8, 5], fov: 60 }}
        style={{ background: 'linear-gradient(to bottom, #87CEEB, #E0F6FF)' }}
      >
        <Scene floorPlanData={floorPlanData} />
      </Canvas>
    </div>
  );
};