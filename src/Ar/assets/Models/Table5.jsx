
import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useCharacterAnimations } from "../../contexts/ModelControl";
import ShadowReceiver from '../../component/ShadowReceiver'

export default function Model(props) {
  const group = useRef();

  const { currentColor } = useCharacterAnimations();
  let scl = [0.1, 0.1, 0.1]
  let rots = [0, 0, 0]
  let pos = [0, -1, 0]
  if (props.table5) {
    rots = props.rotation;
    scl = props.scale
    pos = props.position
  }
  const { nodes, materials } = useGLTF('/model/table5.glb')
  return (
    <group ref={group} {...props} rotation={rots} scale={scl} position={pos} dispose={null}>

      <group position={[0.462, -0.974, 0.901]} scale={464.371}>
        <mesh castShadow geometry={nodes.Cube001_1.geometry} material={materials['Material.002']}
         />
      </group>
      <mesh castShadow geometry={nodes.Cube070.geometry} material={materials.Main} position={[0.462, -0.974, 0.901]} scale={464.371}
        material-color={currentColor}
       />
      <mesh castShadow geometry={nodes.Cube131.geometry} material={materials['vase-041']} position={[0.462, -0.974, 0.901]} scale={464.371} 
        material-color={currentColor}

      />
      <mesh castShadow geometry={nodes.Cube135.geometry} material={materials.Material_34} position={[0.462, -0.974, 0.901]} scale={464.371} />
      <mesh castShadow geometry={nodes.Cube136.geometry} material={materials.Material_60} position={[0.462, -0.974, 0.901]} scale={464.371}
       />
{!props.table5 && <ShadowReceiver position={[0, 0, 0]} />}
    </group>
  )
}

useGLTF.preload('/model/table5.glb')
