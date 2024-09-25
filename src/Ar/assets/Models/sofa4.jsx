

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useCharacterAnimations } from "../../contexts/ModelControl";
import ShadowReceiver from '../../component/ShadowReceiver'

export default function Model(props) {
  const group = useRef();
  const { currentColor } = useCharacterAnimations();
  let scl = [.0015, .0015, .0015]
  let rots = [0, 0, 0]
  let pos = [0, -1.3, 0]
  if (props.sofa4) {
    rots = props.rotation;
    scl = props.scale
    pos = props.position
  }
  const { nodes, materials } = useGLTF('/model/sofa4.glb')
  return (
    <group ref={group} rotation={rots} scale={scl} position={pos} {...props} dispose={null}>

      <mesh castShadow geometry={nodes.pasted__sofabuttons_pasted__buttonsmat1_0.geometry} material={materials.pasted__buttonsmat1} scale={5}
        material-color={currentColor}
      />
      <mesh castShadow geometry={nodes.pasted__sofalegs_pasted__sofalegsShape_bakedmtl2_0.geometry} material={materials.pasted__sofalegsShape_bakedmtl2} scale={5}
        material-color={currentColor}
      />
      <mesh castShadow geometry={nodes.pasted__sodametals_pasted__coopermat1_0.geometry} material={materials.pasted__coopermat1} position={[-0.084, 0, -44.043]} rotation={[-Math.PI / 2, 0, 0]} scale={0.5}
        material-color={currentColor}
      />
      <mesh castShadow geometry={nodes.pasted__sofabody2_pasted__sofabody2Shape_bakedmtl2_0.geometry} material={materials.pasted__sofabody2Shape_bakedmtl2}
        material-color={currentColor}
      />
{!props.sofa4 && <ShadowReceiver position={[0, 0, 0]} />}
    </group>
  )
}

useGLTF.preload('/model/sofa4.glb')
