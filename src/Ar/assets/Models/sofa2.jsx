import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useCharacterAnimations } from "../../contexts/ModelControl";
import ShadowReceiver from "../../component/ShadowReceiver";

export default function Model(props) {
  const group = useRef();
  const { currentColor } = useCharacterAnimations();
  let scl = [1.2, 1.2, 1.2];
  let rots = [0, -3.1, 0];
  let pos = [0, -1.3, 0];
  if (props.sofa2) {
    rots = props.rotation;
    scl = props.scale;
    pos = props.position;
  }
  const { nodes, materials } = useGLTF("/model/sofa2.glb");
  console.log('nodes , materials', nodes , materials)

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
        geometry={nodes.Object_3.geometry}
        material={materials["None_Base_Diffuse.png"]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.304}
      />
      <mesh
        castShadow
        geometry={nodes.Object_4.geometry}
        material={materials["None_Texture.jpg"]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.304}
        material-color={currentColor}
      />
      {!props.sofa2 && <ShadowReceiver position={[0, 0, 0]} />}
    </group>
  );
}

useGLTF.preload("/model/sofa2.glb");
