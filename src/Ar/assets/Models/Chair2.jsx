

import { useRef, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useCharacterAnimations } from "../../contexts/ModelControl";
import ShadowReceiver from '../../component/ShadowReceiver'

const Model = (props) => {
  const { nodes, materials } = useGLTF('/model/chair2-transformed.glb')
  const group = useRef();
  const { currentColor } = useCharacterAnimations();
  useGLTF.preload('/model/chair2-transformed.glb')


  const modelElement = useMemo(() => {
    let scl = [0.012 , 0.012, 0.012]
    let rots = [0, 0, 0]
    let pos = [0, -1.3, 0]
    if (props.chair2) {
      rots = props.rotation;
      scl = props.scale
      pos = props.position
    }
    return (
      <group ref={group} {...props} rotation={rots} scale={scl} position={pos} dispose={null}>
        <mesh geometry={nodes.OfficeChair_OfficeChairMetal_0.geometry} material={materials.OfficeChairMetal} rotation={[-Math.PI / 2, 0, 0]} scale={100} 
          material-color={currentColor}
          castShadow

        />
      <mesh geometry={nodes.OfficeChair_OfficeChairPlastic_0.geometry} material={materials.OfficeChairPlastic} rotation={[-Math.PI / 2, 0, 0]} scale={100} 
        material-color={currentColor}
        castShadow

      />
      <mesh geometry={nodes.OfficeChair_OfficeChairCloth_0.geometry} material={materials.OfficeChairCloth} rotation={[-Math.PI / 2, 0, 0]} scale={100}
      material-color={currentColor}
      castShadow
      />
      <mesh geometry={nodes.OfficeChair_OfficeChairLeather_0.geometry} material={materials.OfficeChairLeather} rotation={[-Math.PI / 2, 0, 0]} scale={100}
      material-color={currentColor} 
      castShadow

      />
    {!props.chair2 && <ShadowReceiver/>}
      </group>
    )
  }, [nodes, materials, currentColor, props.chair2, props.rotation, props.scale, props.position])
  return modelElement;
}
export default Model
