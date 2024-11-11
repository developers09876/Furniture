import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Ortholatex = () => {
  const earth = useGLTF(
    "/public/Organic_Posture_Pedic/Organic_Posture_Pedic.glb"
  );

  const style = {
    display: "block",
    margin: "0 auto",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <Canvas
      style={style}
      frameloop="demand"
      camera={{ position: [0, 0, 15], fov: 45, near: 0.1, far: 200 }}
    >
      <OrbitControls
        autoRotate
        enableZoom={true} // Allow users to zoom in/out
        maxPolarAngle={Math.PI} // Allow full 360° vertical rotation
        minPolarAngle={0} // Allow full 360° vertical rotation
        enablePan={false} // Disable panning to keep the focus centered
      />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <primitive object={earth.scene} scale={0.3} position={[0, 0, 0]} />
    </Canvas>
  );
};

export default Ortholatex;
