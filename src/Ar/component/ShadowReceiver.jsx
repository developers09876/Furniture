
const ShadowReceiver = (props) => {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={props.position}>
      <planeGeometry args={[1500, 1500]} />
      <shadowMaterial opacity={0.6} />
    </mesh>
  );
};

export default ShadowReceiver;
