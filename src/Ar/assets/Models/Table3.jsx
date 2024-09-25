


import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useCharacterAnimations } from "../../contexts/ModelControl";
import ShadowReceiver from '../../component/ShadowReceiver'

export default function Model(props) {
  const group=useRef();
  let {  currentColor } = useCharacterAnimations();
  let scl=[0.1,0.1,0.1]
  let rots=[0,0,0]
  let pos=[0,-1.2,0]
  if(props.table3)
  {
    rots=props.rotation;
    scl=props.scale
    pos=props.position
  }
  const { nodes, materials } = useGLTF('/model/table3.glb')
  return (
    <group ref={group} {...props} rotation={rots} scale={scl} position={pos}   dispose={null}>
      <mesh castShadow geometry={nodes.Object_2.geometry} material={materials['mosiadz.001']} rotation={[-Math.PI / 2, 0, 0]} 
        material-color={currentColor}
      />
      <mesh castShadow geometry={nodes.Object_3.geometry} material={materials['wood.001']} rotation={[-Math.PI / 2, 0, 0]} 
        material-color={currentColor}
      />
{!props.table3 && <ShadowReceiver position={[0,0,0]}/>}
    </group>
  )
}

useGLTF.preload('/model/table3.glb')
