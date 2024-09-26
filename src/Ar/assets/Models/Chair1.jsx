import { useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useCharacterAnimations } from "../../contexts/ModelControl";
import ShadowReceiver from '../../component/ShadowReceiver'

const Model = (props) => {
  const { currentColor } = useCharacterAnimations();
  const groupRef = useRef();

  useGLTF.preload('/model/chair1-transformed.glb');

  const { nodes, materials } = useGLTF('/model/chair1-transformed.glb');

  const modelElements = useMemo(() => {
    let scl = [1.5, 1.5, 1.5];
    let rots = [0, 0, 0];
    let pos = [0, -1.3, 0];

    if (props.chair) {
      rots = props.rotation;
      scl = props.scale;
      pos = props.position;
    }

    return (
      <group ref={groupRef} rotation={rots} scale={scl} position={pos} dispose={null}>
        <mesh geometry={nodes.Object_6.geometry} material={materials.Foregrou} rotation={[-Math.PI / 2, 0, 0]}
          material-color={currentColor}
          castShadow

        />
        <mesh geometry={nodes.Object_7.geometry} material={materials.FrontCol} rotation={[-Math.PI / 2, 0, 0]}
          material-color={currentColor}
          castShadow

        />
        <mesh geometry={nodes.Object_8.geometry} material={materials.Silver_B} rotation={[-Math.PI / 2, 0, 0]}
          material-color={currentColor}
          castShadow

        />
        <mesh geometry={nodes.Object_9.geometry} material={materials.wood} rotation={[-Math.PI / 2, 0, 0]}
          castShadow


        />
{!props.chair && <ShadowReceiver position={[0,0,0]}/>}        
      </group>
    );
  }, [nodes, materials, currentColor, props.chair, props.rotation, props.scale, props.position]);

  return modelElements;
};

export default Model;
