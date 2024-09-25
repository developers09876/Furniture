import  { useRef,useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import ShadowReceiver from '../../component/ShadowReceiver'
export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/model/elevator-transformed.glb')
  const { actions } = useAnimations(animations, group)
  useEffect(() => {

    Object.values(actions).forEach(action => {
      if (action.play) {
        action.play()
      }
    })

    
  }, [actions])

  let scl=[0.3,0.3,0.3]
  let rots=[0,-1.6,0]
  let pos=[0,-1,0]
  if(props.elevator1)
  {
    rots=props.rotation;
    scl=props.scale
    pos=props.position
  }
  return (
    <group ref={group} {...props} position={pos} rotation={rots} scale={scl} dispose={null}>
      <group name="Scene">
        <group name="group" position={[-1.067, 0, 1.649]} rotation={[Math.PI / 2, 0, -1.709]} scale={[0.418, 0.408, 0.455]}>
          <group name="pasted__ELEVATOR_DOOR__CTRL" />
        </group>
        <group name="polySurface806" position={[1.055, -0.019, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={-0.471}>
          <group name="polySurface2471" />
          <group name="polySurface2475" />
        </group>
        <group name="GLTF_SceneRootNode">
          <group name="ElevatorCallingButtons006_14" position={[0.188, 3.283, -0.072]} rotation={[Math.PI, 0, Math.PI]} scale={0.01}>
            <mesh castShadow name="Object_39" geometry={nodes.Object_39.geometry} material={materials.Emission} />
          </group>
          <group name="ElevatorCallingButtons007_13" position={[0.188, 3.322, 0.086]}>
            <mesh castShadow name="Object_37" geometry={nodes.Object_37.geometry} material={materials.Emission} />
          </group>
          <group name="LeftOutsideDoor_0" position={[0.026, 1, 0]} rotation={[0, 0, -Math.PI / 2]} scale={[1, 0.438, 1]}>
            <mesh castShadow name="Object_4" geometry={nodes.Object_4.geometry} material={materials.Metal} />
          </group>
          <group name="RightOutsideDoor_1" position={[0.026, 1, 0]} rotation={[0, 0, -Math.PI / 2]} scale={[1, 0.438, 1]}>
            <mesh castShadow name="Object_6" geometry={nodes.Object_6.geometry} material={materials.Metal} />
          </group>
        </group>
        <group name="ElevatorCage_11" position={[-0.04, 1.015, 0]}>
          <group name="LeftInteriorDoor_8" position={[-0.008, 0, 0]} rotation={[0, 0, -Math.PI / 2]} scale={[1, 0.572, 1]}>
            <mesh castShadow name="Object_27" geometry={nodes.Object_27.geometry} material={materials.Metal} />
          </group>
          <group name="RightInteriorDoor_10" position={[-0.01, 0.4, -0.003]} rotation={[0, 0, -Math.PI / 2]} scale={[1, 0.572, 1]}>
            <mesh castShadow name="Object_32" geometry={nodes.Object_32.geometry} material={materials.Metal} />
          </group>
        </group>
        <group name="pasted__polySurface806" position={[-1.067, 0, 1.649]} rotation={[Math.PI / 2, 0, -1.709]} scale={[0.418, 0.408, 0.455]}>
          <group name="pasted__polySurface2471" />
          <group name="pasted__polySurface2475" />
        </group>
        <mesh castShadow name="polySurface5408001" geometry={nodes.polySurface5408001.geometry} material={materials['Fine Gold']} position={[-1.565, -0.2, -0.307]} rotation={[Math.PI / 2, 0, -3.118]} scale={[0.474, 0.339, 0.455]} />
        <mesh castShadow name="polySurface5410001" geometry={nodes.polySurface5410001.geometry} material={materials['Black Marble Procedural.002']} position={[-1.648, -0.2, -0.265]} rotation={[Math.PI / 2, 0, -3.118]} scale={[0.418, 0.339, 0.481]} />
        <mesh castShadow name="polySurface2472001" geometry={nodes.polySurface2472001.geometry} material={materials.lambert2} position={[-1.173, -0.2, -0.407]} rotation={[Math.PI / 2, 0, -3.033]} scale={[0.418, 0.408, 0.455]} />
        <mesh castShadow name="polySurface5409002" geometry={nodes.polySurface5409002.geometry} material={materials['Wood panel verze2']} position={[-1.55, -0.2, -0.309]} rotation={[Math.PI / 2, 0, -3.033]} scale={[0.449, 0.325, 0.49]} />
        <mesh castShadow name="Plane" geometry={nodes.Plane.geometry} material={materials['Black Marble Procedural.001']} position={[-0.223, 0.184, 0]} scale={[2.274, 2.274, 1.599]} />
        <mesh castShadow name="Object_41" geometry={nodes.Object_41.geometry} material={materials.DarkerMetal} position={[0.188, 3.3, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} scale={1.322} />
        <mesh castShadow name="Object_34" geometry={nodes.Object_34.geometry} material={materials.Metal} position={[0.173, 1.463, -1.335]} rotation={[0, 0, -Math.PI / 2]} scale={1.192} />
        <mesh castShadow name="Object_35" geometry={nodes.Object_35.geometry} material={materials.Emission} position={[0.173, 1.463, -1.335]} rotation={[0, 0, -Math.PI / 2]} scale={1.192} />
        <mesh castShadow name="polySurface2427001" geometry={nodes.polySurface2427001.geometry} material={materials['lambert1.001']} position={[-1.192, -0.2, -0.436]} rotation={[1.571, -0.004, -3.064]} scale={[0.409, 0.418, 0.455]} />
      </group>
      {!props.elevator1 && <ShadowReceiver/>}

    </group>
  )
}

useGLTF.preload('/model/elevator-transformed.glb')
