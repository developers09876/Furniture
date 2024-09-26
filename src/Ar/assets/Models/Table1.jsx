
import  { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useCharacterAnimations } from "../../contexts/ModelControl";
import ShadowReceiver from '../../component/ShadowReceiver'

export default function Model(props) {
  const group=useRef();
  let {  currentColor } = useCharacterAnimations();
  let scl=[2.5,2.5,2.5]
  let rots=[0,0,0]
  let pos=[0,-1.2,0]
  if(props.table1)
  {
    rots=props.rotation;
    scl=props.scale
    pos=props.position
  }
  const { nodes, materials } = useGLTF('/model/table1.glb')
  return (
<group ref={group} {...props} rotation={rots} scale={scl} position={pos} dispose={null}>
      <mesh geometry={nodes.legs.geometry} material={materials['Material.001']} position={[0.154, 0.416, -0.109]} 
        material-color={currentColor}
        castShadow
      />
      <mesh geometry={nodes.supports.geometry} material={materials['Material.001']} position={[-0.096, 0.114, 0]} 
    material-color={currentColor}
    castShadow

      />
      <mesh geometry={nodes.table_bottom_support.geometry} material={materials['Material.001']} position={[0, 0.416, 0.064]} 
    material-color={currentColor}
    castShadow

      />
      <mesh geometry={nodes.table_top003.geometry} material={materials['Material.001']} position={[0, 0.458, 0]}
    material-color={currentColor}
        castShadow

       />
{!props.table1 && <ShadowReceiver position={[0,0,0]}/>}
    </group>
  )
}

useGLTF.preload('/model/table1.glb')
