import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useCharacterAnimations } from "../../contexts/ModelControl";
import ShadowReceiver from "../../component/ShadowReceiver";

export default function Model(props) {
  let scl = [0.8, 0.8, 0.8];
  let rots = [0, 1.5, 0];
  let pos = [0.2, -1, 0];
  if (props.sofa1) {
    rots = props.rotation;
    scl = props.scale;
    pos = props.position;
  }
  const { nodes, materials } = useGLTF("/model/sofa1-transformed.glb");
  console.log("materials", materials);
  const group = useRef();
  const { currentColor } = useCharacterAnimations();
  return (
    <group
      ref={group}
      scale={scl}
      rotation={rots}
      position={pos}
      dispose={null}
    >
      <mesh
        geometry={nodes.Foot.geometry}
        material={materials.Black}
        position={[-0.38, 0.044, -1.551]}
        castShadow
      />
      <mesh
        geometry={nodes.pillow4.geometry}
        material={materials.Sofa_Fabric}
        position={[0.095, 0.581, 0.816]}
        rotation={[-3.102, 0.977, -1.177]}
        material-color={currentColor}
        castShadow
      />
      {!props.sofa1 && <ShadowReceiver position={[0, 0, 0]} />}
    </group>
  );
}

useGLTF.preload("/model/sofa1-transformed.glb");
