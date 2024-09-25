

import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useCharacterAnimations } from "../../contexts/ModelControl";
import ShadowReceiver from '../../component/ShadowReceiver'

export default function Model(props) {
  const group = useRef();
  const { currentColor } = useCharacterAnimations();
  let scl = [0.8, 0.8, 0.8]
  let rots = [0, -1.5, 0]
  let pos = [0, -0.5, 0]
  if (props.sofa7) {
    rots = props.rotation;
    scl = props.scale
    pos = props.position
  }
  const { nodes, materials } = useGLTF('/model/sofa7.glb')
  return (
    <group ref={group} rotation={rots} scale={scl} position={pos} {...props} dispose={null}>
      <mesh castShadow geometry={nodes.Cylinder.geometry} material={materials.PaletteMaterial001} position={[-0.982, -0.165, 0.853]} rotation={[0, -0.001, 0]} scale={[1.22, 0.615, 1.392]} />
      <mesh castShadow geometry={nodes.Object_5.geometry} material={materials.Asset_Mat_mr} position={[1.593, -0.589, 7.03]} scale={2.719} />
{!props.sofa7 && <ShadowReceiver position={[0, 0, 0]} />}
    </group>
  )
}

useGLTF.preload('/model/sofa7.glb')
