
import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useCharacterAnimations } from "../../contexts/ModelControl";
import ShadowReceiver from '../../component/ShadowReceiver'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/model/lamp2-transformed.glb')
  const group = useRef();
  const { currentColor } = useCharacterAnimations();
  let scl = [0.03, 0.03, 0.03]
  let rots = [0, 0, 0]
  let pos = [0, -1.3, 0]
  if (props.lamp2) {
    rots = props.rotation;
    scl = props.scale
    pos = props.position
  }
  return (
    <group ref={group} position={pos} rotation={rots} scale={scl} {...props} dispose={null}>
      <mesh castShadow geometry={nodes.defaultMaterial.geometry} material={materials.lambert4} position={[-19.972, 37.743, -15.719]} rotation={[0, 0, -1.063]} scale={0.822}
        material-color={currentColor}
      />
      <mesh castShadow geometry={nodes.defaultMaterial_1.geometry} material={materials.lambert5} position={[0, 30.183, 0]} scale={0.766}
        material-color={currentColor}
      />
      <mesh castShadow geometry={nodes.defaultMaterial_2.geometry} material={materials.lambert2} position={[0, 24.958, 0]}
        material-color={currentColor} />
      <mesh castShadow geometry={nodes.defaultMaterial_3.geometry} material={materials.lambert3} position={[0, 24.958, 0]}
        material-color={currentColor}
      />
      {!props.lamp2 && <ShadowReceiver position={[0, 2, 0]} />}
    </group>
  )
}

useGLTF.preload('/model/lamp2-transformed.glb')
