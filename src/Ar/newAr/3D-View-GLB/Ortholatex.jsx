import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useLocation } from "react-router-dom";

const Ortholatex = () => {
  const style = {
    display: "block",
    margin: "0 auto",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const { state } = useLocation();
  const objectName = state || "";

  // Dynamically construct the GLB file path
  const glbPath = `/public/3D-View-GLB/${objectName}.glb`;

  // Dynamically load the GLB model
  const model = useGLTF(glbPath, true); // `true` ensures the loader retries if the file isn't preloaded

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Canvas
        style={style}
        frameloop="demand"
        camera={{ position: [0, 0, 15], fov: 45, near: 0.1, far: 200 }}
      >
        <OrbitControls
          autoRotate
          enableZoom={true}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
          enablePan={false}
        />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Render the dynamically loaded model */}
        {model && (
          <primitive object={model.scene} scale={0.3} position={[0, 0, 0]} />
        )}
      </Canvas>
    </Suspense>
  );
};

export default Ortholatex;
