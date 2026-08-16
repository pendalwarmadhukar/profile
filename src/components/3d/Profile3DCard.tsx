import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Shield, Move, Play, Pause, Compass } from 'lucide-react';

// Holographic Circular Platform beneath photo
function HolographicPlatform() {
  const ringsRef = useRef<THREE.Group>(null!);
  const gridRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.z += delta * 0.4;
    }
    if (gridRef.current) {
      gridRef.current.rotation.z -= delta * 0.2;
    }
  });

  return (
    <group position={[0, -2.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {/* Base Glowing Hologram Disc */}
      <mesh ref={gridRef}>
        <ringGeometry args={[0.2, 2.4, 64]} />
        <meshBasicMaterial
          color="#00f3ff"
          wireframe
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer Neon Glow Ring */}
      <mesh>
        <ringGeometry args={[2.35, 2.45, 64]} />
        <meshBasicMaterial color="#00f3ff" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>

      {/* Red/Magenta Accent Inner Ring */}
      <mesh>
        <ringGeometry args={[1.5, 1.55, 64]} />
        <meshBasicMaterial color="#ff0055" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Rotating Ring Array */}
      <group ref={ringsRef}>
        {[1.0, 1.8, 2.2].map((radius, index) => (
          <mesh key={index} rotation={[0, 0, (index * Math.PI) / 3]}>
            <ringGeometry args={[radius, radius + 0.03, 48]} />
            <meshBasicMaterial
              color={index % 2 === 0 ? "#00f3ff" : "#ff0055"}
              transparent
              opacity={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Rotating Holographic Orbital Rings surrounding the photo
function HolographicOrbitRings() {
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.3;
      ring1Ref.current.rotation.y += delta * 0.5;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x -= delta * 0.4;
      ring2Ref.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Cyan Orbital Ring */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[2.3, 0.015, 16, 100]} />
        <meshBasicMaterial color="#00f3ff" transparent opacity={0.5} />
      </mesh>

      {/* Red Orbital Ring */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, 0, Math.PI / 4]}>
        <torusGeometry args={[2.5, 0.012, 16, 100]} />
        <meshBasicMaterial color="#ff0055" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

// 3D Photo Plane Component with intact original photo & room background
function Photo3DPlane({ isAutoRotate }: { isAutoRotate: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  
  // Load original full resolution intact photo
  const originalTexture = useTexture('/madhukar_original.jpg');

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (isAutoRotate) {
        groupRef.current.rotation.y += delta * 0.6;
      } else {
        // Smooth mouse parallax tilt in manual rotation mode
        const targetX = (state.pointer.y * Math.PI) / 10;
        const targetY = (state.pointer.x * Math.PI) / 6;
        groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.08;
        groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.08;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Intact Original Professional Photo Plane */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2.7, 3.6]} />
        <meshStandardMaterial
          map={originalTexture}
          roughness={0.2}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cyber Glass Backing Plate */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[2.82, 3.72]} />
        <meshPhysicalMaterial
          color="#0f172a"
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Glowing Laser Border Accent */}
      <mesh position={[0, 0, 0.01]}>
        <ringGeometry args={[1.72, 1.74, 4]} />
        <meshBasicMaterial color="#00f3ff" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// Fallback loader while texture loads
function CanvasLoader() {
  return (
    <mesh>
      <boxGeometry args={[2.7, 3.6, 0.1]} />
      <meshBasicMaterial color="#00f3ff" wireframe transparent opacity={0.3} />
    </mesh>
  );
}

export default function Profile3DCard() {
  const [isAutoRotate, setIsAutoRotate] = useState(true);

  return (
    <div className="relative w-full border border-cyber-border rounded-2xl bg-cyber-card/90 backdrop-blur-md p-4 shadow-cyber-glow overflow-hidden select-none font-mono group">
      {/* Top Cyber Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyber-secondary via-cyber-primary to-cyber-secondary"></div>

      {/* Header HUD Bar */}
      <div className="flex items-center justify-between border-b border-cyber-border/80 pb-3 z-10 relative">
        <div className="flex items-center space-x-2">
          <Shield className="h-4 w-4 text-cyber-primary animate-pulse" />
          <span className="text-slate-200 text-xs font-bold uppercase tracking-wider">
            PROFILE 3D STAGE
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyber-primary/10 border border-cyber-primary/40 text-cyber-primary flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-cyber-primary animate-ping"></span>
            360°
          </span>
        </div>
      </div>

      {/* 3D Interactive Canvas Stage */}
      <div className="relative h-[420px] sm:h-[460px] w-full my-2 rounded-xl bg-slate-950/70 border border-cyber-border/40 overflow-hidden cursor-grab active:cursor-grabbing">
        {/* Subtle Cyber Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#00f3ff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>

        {/* Scanlines Effect */}
        <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-20"></div>

        <Canvas camera={{ position: [0, 0, 5.2], fov: 45 }}>
          {/* Subtle Red + Cyan Cybersecurity Lighting */}
          <ambientLight intensity={0.9} />
          {/* Cyan Light Top Left */}
          <pointLight position={[-3.5, 3, 3]} intensity={3.5} color="#00f3ff" />
          {/* Red/Magenta Light Bottom Right */}
          <pointLight position={[3.5, -2.5, 2.5]} intensity={2.5} color="#ff0055" />
          {/* Soft Directional Light */}
          <directionalLight position={[0, 4, 4]} intensity={1.2} />

          <Suspense fallback={<CanvasLoader />}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
              <Photo3DPlane isAutoRotate={isAutoRotate} />
              <HolographicPlatform />
              <HolographicOrbitRings />
            </Float>

            {/* Floating Particles Network */}
            <Sparkles count={45} scale={4.8} size={2.5} speed={0.4} color="#00f3ff" />
            <Sparkles count={30} scale={4.8} size={2.0} speed={0.3} color="#ff0055" />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={isAutoRotate}
            autoRotateSpeed={2.5}
            maxPolarAngle={Math.PI / 1.75}
            minPolarAngle={Math.PI / 2.55}
          />
        </Canvas>

        {/* HUD Overlay Reticles */}
        <div className="absolute top-2 left-2 text-[9px] text-cyber-primary/70 font-mono pointer-events-none">
          SYS::3D_RENDER // 60FPS
        </div>
        <div className="absolute top-2 right-2 text-[9px] text-slate-500 font-mono pointer-events-none">
          HOLO_GRID v2.4
        </div>
        <div className="absolute bottom-2 left-2 text-[9px] text-slate-400 font-mono pointer-events-none flex items-center gap-1">
          <Move className="h-3 w-3 text-cyber-primary" />
          <span>DRAG TO ROTATE</span>
        </div>
      </div>

      {/* Controls Footer */}
      <div className="pt-2 flex items-center justify-between gap-2">
        {/* Auto Rotate Toggle Button */}
        <button
          onClick={() => setIsAutoRotate(!isAutoRotate)}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all duration-300 ${
            isAutoRotate
              ? 'bg-cyber-primary/20 border-cyber-primary text-cyber-primary shadow-[0_0_12px_rgba(0,243,255,0.3)]'
              : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
        >
          {isAutoRotate ? (
            <>
              <Pause className="h-3.5 w-3.5" />
              <span>AUTO ROTATE ON</span>
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5" />
              <span>AUTO ROTATE OFF</span>
            </>
          )}
        </button>

        {/* Mode Badge */}
        <div className="flex items-center space-x-1 text-[11px] text-slate-400">
          <Compass className="h-3.5 w-3.5 text-cyber-secondary" />
          <span className="font-semibold">INTERACTIVE 3D HUD</span>
        </div>
      </div>
    </div>
  );
}
