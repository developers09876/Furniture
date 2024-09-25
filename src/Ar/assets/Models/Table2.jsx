import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useCharacterAnimations } from "../../contexts/ModelControl";
import ShadowReceiver from '../../component/ShadowReceiver'

export default function Model(props) {
  let scl=[1.5,1.5,1.5]
  let rots=[0,0,0]
  let pos=[0,-1.3,0]
  if(props.table2)
  {
    rots=props.rotation;
    scl=props.scale
    pos=props.position
  }
  const group=useRef();
  const {  currentColor } = useCharacterAnimations();
  const { nodes, materials } = useGLTF('/model/table2.glb')
  return (
    <group ref={group} position={pos} scale={scl} rotation={rots} {...props} dispose={null}>
      <mesh castShadow geometry={nodes.Coffee_table.geometry} material={materials.Материал} rotation={[0, 0, 0]} 
        material-color={currentColor}
      />
{!props.table2 && <ShadowReceiver position={[0,0,0]}/>}
    </group>
  )
}

useGLTF.preload('/model/table2.glb')
