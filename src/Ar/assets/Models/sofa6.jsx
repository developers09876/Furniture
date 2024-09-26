

import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useCharacterAnimations } from "../../contexts/ModelControl";
import ShadowReceiver from '../../component/ShadowReceiver'

export default function Model(props) {
  const group = useRef();
  const { currentColor } = useCharacterAnimations();
  let scl = [0.027, 0.027, 0.027]
  let rots = [0, 1.5, 0]
  let pos = [0, -1, 0]
  if (props.sofa6) {
    rots = props.rotation;
    scl = props.scale
    pos = props.position
  }
  const { nodes, materials } = useGLTF('/model/sofa6.glb')
  return (
    <group ref={group} rotation={rots} scale={scl} position={pos} {...props} dispose={null}>
      <mesh castShadow geometry={nodes.Cube.geometry} material={materials.PaletteMaterial001} position={[-0.487, 3.422, 28.863]} rotation={[-Math.PI, 0, 0]} scale={[-0.136, -3.125, -0.112]} />
      <mesh castShadow geometry={nodes.Cube004.geometry} material={materials['Used Paindted Green Wall']} position={[-13.56, 9.422, -23.639]} scale={[1, 1.496, 1.258]} />
      <mesh castShadow geometry={nodes.Object_34.geometry} material={materials.g} position={[-14.516, 0, -23.223]} scale={0.013} />
      <mesh castShadow geometry={nodes.Object_4001.geometry} material={materials['carpet.001']} position={[-18.403, -0.832, 13.298]} rotation={[-Math.PI, 0, -0.009]} scale={[-6.257, 6.257, 6.257]} />
      <mesh castShadow geometry={nodes['1_low_Giotto-C_0'].geometry} material={materials['Wood.001']} position={[-12.987, -0.26, 11.1]} rotation={[-Math.PI / 2, 0, 0.035]} scale={11.919} />
      <mesh castShadow geometry={nodes.Vase_6_cyan001_Ceramic_dark_cyan002_0.geometry} material={materials['Ceramic_dark_cyan.004']} position={[-11.977, 3.971, 11.499]} rotation={[-Math.PI / 2, 0, 0.997]} scale={11.919} />
{!props.sofa6 && <ShadowReceiver position={[0, 0, 0]} />}
    </group>
  )
}

useGLTF.preload('/model/sofa6.glb')
