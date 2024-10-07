// // import { Canvas } from '@react-three/fiber';

// // const Ortholatex = () => {
// //   return (
// //     <Canvas frameloop="demand" camera={{ position: [-4, 3, 6], fov: 45, near: 0.1, far: 200 }}> 
// //     </Canvas>
// //   );
// // };

// // export default Ortholatex;



// import { Canvas } from '@react-three/fiber';

// import { OrbitControls, useGLTF } from '@react-three/drei';



// const Ortholatex = () => {

//   const earth = useGLTF('/model/Ortholatex.glb');
  
// return (

//     <Canvas className="cursor-pointer" frameloop="demand" camera={{ position: [-4, 3, 6], fov: 45, near: 0.1, far: 200 }}>

//       <OrbitControls autoRotate enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} enablePan={false} />

//       <primitive object={earth.scene} scale={2.5} />

//     </Canvas>

//   );

// };



// export default Ortholatex;



import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Ortholatex = () => {
  const earth = useGLTF('/model/sofa2.glb');

  const style = {
    display: "block",
    margin: "0 auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100vw",
    height: "100vh"
  };
  return (
    <Canvas
      style={style}
      frameloop="demand"
      camera={{ position: [0, 0, 15], fov: 45, near: 0.1, far: 200 }} // Move the camera further away
    >
      <OrbitControls
        autoRotate
        enableZoom={true}  // Allow users to zoom in/out
        maxPolarAngle={Math.PI}  // Allow full 360° vertical rotation
        minPolarAngle={0}        // Allow full 360° vertical rotation
        enablePan={false}        // Disable panning to keep the focus centered
      />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <primitive object={earth.scene} scale={1.5} position={[0, 0, 0]} /> {/* Adjust scale */}
    </Canvas>
  );
};

export default Ortholatex;


