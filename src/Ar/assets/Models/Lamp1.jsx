

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useCharacterAnimations } from "../../contexts/ModelControl";
import ShadowReceiver from '../../component/ShadowReceiver'

export default function Model(props) {
  const group = useRef();
  const { currentColor } = useCharacterAnimations();
  let scl = [0.5, 0.5, 0.5]
  let rots = [0, 0, 0]
  let pos = [0, -1.3, 0]
  if (props.lamp1) {
    rots = props.rotation;
    scl = props.scale
    pos = props.position
  }
  const { nodes, materials } = useGLTF('/model/lamp1-transformed.glb')
  return (
    <group ref={group} {...props} position={pos} rotation={rots} scale={scl} dispose={null}>
      <mesh castShadow geometry={nodes.light.geometry} material={materials.Lamp} scale={5} />
      <mesh castShadow geometry={nodes.Table_Lamp_bottom.geometry} material={materials.Porcelain} scale={5} material-color={currentColor} />
      <mesh castShadow geometry={nodes.Table_Lamp_fabric.geometry} material={materials.Fabric} scale={5} />
      <mesh castShadow geometry={nodes.Table_Lamp_fabric_rim.geometry} material={materials['Old White Metal']} scale={5} />
      {!props.lamp1 && <ShadowReceiver />}
    </group>
  )
}

useGLTF.preload('/model/lamp1-transformed.glb')
