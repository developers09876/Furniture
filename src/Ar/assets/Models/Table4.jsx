
import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useCharacterAnimations } from "../../contexts/ModelControl";
import ShadowReceiver from '../../component/ShadowReceiver'

export default function Model(props) {
  const group = useRef();
  
  const { currentColor } = useCharacterAnimations();
  let scl = [1, 1, 1]
  let rots = [0, 0, 0]
  let pos = [0, -0.5, 0]
  if (props.table4) {
    rots = props.rotation;
    scl = props.scale
    pos = props.position
  }
  const { nodes, materials } = useGLTF('/model/table4.glb')
  return (
    <group ref={group} {...props} rotation={rots} scale={scl} position={pos} dispose={null}>

      <mesh castShadow geometry={nodes.defaultMaterial.geometry} material={materials.Folding_Table} scale={0.973} 
        material-color={currentColor}

      />
{!props.table4 && <ShadowReceiver position={[0, -0.4,0]}/>}
    </group>
  )
}

useGLTF.preload('/model/table4.glb')
