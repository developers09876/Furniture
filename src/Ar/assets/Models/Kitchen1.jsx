
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import ShadowReceiver from '../../component/ShadowReceiver'

export default function Model(props) {
  const group=useRef();
  let scl=[.25,.25,.25]
  let rots=[0,1.56,0]
  let pos=[-0.2,-1,0]
  if(props.kitchen1)
  {
    rots=props.rotation;
    scl=props.scale
    pos=props.position
  }
  const { nodes, materials } = useGLTF('/model/kitchen1.glb')
  return (
    <group ref={group} {...props} position={pos} rotation={rots} scale={scl} dispose={null}>
    <mesh castShadow geometry={nodes.Object_4.geometry} material={materials.things_02_mat} position={[2.96, 0.341, 4.431]} scale={[0.038, 0.247, 0.548]} />
    <mesh castShadow geometry={nodes.Object_6.geometry} material={materials.things_mat} position={[1.537, 3.277, -2.739]} rotation={[0, -0.016, 0]} scale={[0.01, 0.002, 0.01]} />
    <mesh castShadow geometry={nodes.Object_22.geometry} material={materials.glass_mat} position={[1.811, 4.173, -2.387]} rotation={[-Math.PI, 0, 0]} scale={[0.082, 0.065, 0.082]} />
    <mesh castShadow geometry={nodes.Object_127.geometry} material={materials.wallFloor_mat} scale={[2.993, 0.098, 2.993]} />
    <mesh castShadow geometry={nodes.Object_129.geometry} material={materials.appliance_mat} position={[1.975, 1.079, -2.228]} scale={[1, 1, 0.75]} />
    <mesh castShadow geometry={nodes.Object_130.geometry} material={materials.woodenFurniture_mat} position={[1.975, 1.079, -2.228]} scale={[1, 1, 0.75]} />
    <mesh castShadow geometry={nodes.Object_186.geometry} material={materials.transparencies_mat} position={[1.317, 3.18, -2.41]} rotation={[-0.049, 0.087, -1.479]} scale={[0.12, 0.148, 0.077]} />
    <instancedMesh args={[nodes.Object_11.geometry, materials.glass_mat, 5]} instanceMatrix={nodes.Object_11.instanceMatrix} />
    {!props.kitchen1 && <ShadowReceiver/>}

    </group>
  )
}

useGLTF.preload('/model/kitchen1.glb')
