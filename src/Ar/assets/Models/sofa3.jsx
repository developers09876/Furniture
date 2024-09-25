// import React, { useRef } from "react";
// import { useGLTF } from "@react-three/drei";
// import { useCharacterAnimations } from "../../contexts/ModelControl";
// import ShadowReceiver from "../../component/ShadowReceiver";

// export default function Model(props) {
//   alert("sofa3 triggerd");
//   const group = useRef();
//   const { currentColor } = useCharacterAnimations();
//   let scl = [1.1, 1.1, 1.1];
//   let rots = [0, 0, 0];
//   let pos = [0, -1.3, 0];
//   if (props.sofa3) {
//     rots = props.rotation;
//     scl = props.scale;
//     pos = props.position;
//   }
//   const { nodes, materials } = useGLTF("/model/sofa3.glb");
//   return (
//     <group
//       ref={group}
//       rotation={rots}
//       scale={scl}
//       position={pos}
//       {...props}
//       dispose={null}
//     >
//       <mesh
//         castShadow
//         geometry={nodes.pillow1_sofa_0.geometry}
//         material={materials.sofa}
//         position={[0.357, 0.627, -0.094]}
//         rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
//         scale={0.9}
//         material-color={currentColor}
//       />
//       {!props.sofa3 && <ShadowReceiver position={[0, 0, 0]} />}
//     </group>
//   );
// }

// useGLTF.preload("/model/sofa3.glb");

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useCharacterAnimations } from "../../contexts/ModelControl";
import ShadowReceiver from "../../component/ShadowReceiver";
export default function Model(props) {
  const group = useRef();
  const { currentColor } = useCharacterAnimations();
  let scl = [1.1, 1.1, 1.1];
  let rots = [0, 0, 0];
  let pos = [0, -1.3, 0];

  // Apply props if sofa3 is true
  if (props.sofa3) {
    rots = props.rotation;
    scl = props.scale;
    pos = props.position;
  }

  let gltf;
  try {
    // Try loading the GLB model
    gltf = useGLTF("/model/sofa3.glb");
  } catch (error) {
    // Log error if model loading fails
    console.error("Error loading sofa3 model:", error);
    return (
      <mesh>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }

  const { nodes, materials } = gltf;

  // If model loaded successfully, return the mesh
  return (
    <group
      ref={group}
      rotation={rots}
      scale={scl}
      position={pos}
      {...props}
      dispose={null}
    >
      <mesh
        castShadow
        geometry={nodes?.pillow1_sofa_0?.geometry} // Add optional chaining in case nodes is undefined
        material={materials?.sofa}
        position={[0.357, 0.627, -0.094]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        scale={0.9}
        material-color={currentColor}
      />
      {!props.sofa3 && <ShadowReceiver position={[0, 0, 0]} />}
    </group>
  );
}

// Preload the model
useGLTF.preload("/model/sofa3.glb");
