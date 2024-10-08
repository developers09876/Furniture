import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Interactive, useHitTest, useXR } from "@react-three/xr";

import { Fragment, useEffect, useRef, useState } from "react";
import Ortholatex from "../../assets/Models/Ortholatex"
import Chair1 from "../../assets/Models/Chair1";
import Chair2 from "../../assets/Models/Chair2";
import Lamp1 from "../../assets/Models/Lamp1";
import Lamp2 from "../../assets/Models/Lamp2";
import Sofa1 from "../../assets/Models/Sofa1";
import Sofa2 from "../../assets/Models/sofa2";
import Sofa3 from "../../assets/Models/sofa3";
import Sofa4 from "../../assets/Models/sofa4";
import Sofa5 from "../../assets/Models/sofa5";
import Sofa6 from "../../assets/Models/sofa6";
import Sofa7 from "../../assets/Models/sofa7";
import Table1 from "../../assets/Models/Table1";
import Table2 from "../../assets/Models/Table2";
import Table3 from "../../assets/Models/Table3";
import Table4 from "../../assets/Models/Table4";
import Table5 from "../../assets/Models/Table5";
import Kitchen1 from "../../assets/Models/Kitchen1";
import Elevator1 from "../../assets/Models/Elevator1";

import { useCharacterAnimations } from "../../contexts/ModelControl";
import { useGesture } from "@use-gesture/react";

const XrOverlay = () => {
  const reticleRef = useRef();
  const [models, setModels] = useState([]);
  const { currentModelName, SetPresenting } = useCharacterAnimations();
  console.log("currentModelName", currentModelName);
  console.log("SetPresenting", SetPresenting);
  const { isPresenting } = useXR();
  console.log("isPresenting", isPresenting);
  const prevIsPresentingRef = useRef(null);
  useEffect(() => {
    if (prevIsPresentingRef.current && !isPresenting) {
      window.location.reload();
    }
    SetPresenting(isPresenting);
    prevIsPresentingRef.current = isPresenting;
  }, [isPresenting]);

  const [rotation, setRotation] = useState([0, 0, 0]);
  const [zoom, setZoom] = useState(1);

  const prevOffsetRef = useRef(0);
  const { camera } = useThree();

  useEffect(() => {
    if (!isPresenting) {
      camera.position.z = 3;
    }
  }, [isPresenting, camera]);

  useHitTest((hitMatrix, hit) => {
    hitMatrix.decompose(
      reticleRef.current.position,
      reticleRef.current.quaternion,
      reticleRef.current.scale
    );
    reticleRef.current.matrixWorldAutoUpdate = true;
    reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
  });

  const placeModel = (e) => {
    let position = e.intersection.object.position.clone();
    let id = Date.now();
    setModels([{ position, id }]);
  };

  const bind = useGesture(
    {
      onPinch: ({ delta }) => {
        setZoom((prevZoom) => Math.max(0.1, prevZoom + delta[0] * 9));
      },
      onDrag: ({ pinching, cancel, offset }) => {
        if (pinching) return cancel();
        const sensitivity = 0.01;
        const diffOffset = offset[0] - prevOffsetRef.current;
        if (Math.abs(diffOffset) > 0.001) {
          const rotationY = Math.abs(diffOffset) * sensitivity;
          setRotation((prevRotation) => [
            prevRotation[0],
            prevRotation[1] + (diffOffset > 0 ? rotationY : -rotationY),
            prevRotation[2],
          ]);
          prevOffsetRef.current = offset[0];
        }
      },
    },
    {
      target: window,
      eventOptions: { passive: false },
    }
  );

  return (
    <>
      {!isPresenting && <OrbitControls />}
      <ambientLight />
      {isPresenting &&
        models.map(({ position, id }) => {
          return (
            <Fragment key={id}>
              {currentModelName === "Ortholatex" && (
                <Ortholatex
                Ortholatex={isPresenting}
                  position={position}
                  rotation={rotation}
                  scale={[zoom * 0.85, zoom * 0.85, zoom * 0.85]}
                />
              )}
              {currentModelName === "chair1" && (
                <Chair1
                  chair={isPresenting}
                  position={position}
                  rotation={rotation}
                  scale={[zoom * 0.85, zoom * 0.85, zoom * 0.85]}
                />
              )}
              {currentModelName === "chair2" && (
                <Chair2
                  chair2={isPresenting}
                  position={position}
                  rotation={rotation}
                  scale={[zoom * 0.007, zoom * 0.007, zoom * 0.007]}
                />
              )}
              {currentModelName === "table1" && (
                <Table1
                  table1={isPresenting}
                  position={position}
                  rotation={rotation}
                  scale={[zoom * 0.85, zoom * 0.85, zoom * 0.85]}
                />
              )}
              {currentModelName === "table2" && (
                <Table2
                  table2={isPresenting}
                  position={position}
                  rotation={rotation}
                  scale={[zoom * 0.7, zoom * 0.7, zoom * 0.7]}
                />
              )}
              {currentModelName === "table3" && (
                <Table3
                  table3={isPresenting}
                  position={position}
                  rotation={rotation}
                  scale={[zoom * 0.07, zoom * 0.07, zoom * 0.07]}
                />
              )}
              {currentModelName === "table4" && (
                <Table4
                  table4={isPresenting}
                  position={position}
                  rotation={rotation}
                  scale={[zoom * 0.5, zoom * 0.5, zoom * 0.5]}
                />
              )}
              {currentModelName === "table5" && (
                <Table5
                  table5={isPresenting}
                  position={position}
                  rotation={rotation}
                  scale={[zoom * 0.05, zoom * 0.05, zoom * 0.05]}
                />
              )}
              {currentModelName === "sofa1" && (
                <Sofa1
                  sofa1={isPresenting}
                  position={position}
                  rotation={rotation}
                  scale={[zoom * 0.5, zoom * 0.5, zoom * 0.5]}
                />
              )}
              {currentModelName === "sofa2" && (
                <Sofa2
                  sofa2={isPresenting}
                  position={position}
                  rotation={rotation}
                  scale={[zoom * 0.5, zoom * 0.5, zoom * 0.5]}
                />
              )}
              {currentModelName === "sofa3" && (
                <Sofa3
                  sofa3={isPresenting}
                  position={position}
                  rotation={rotation}
                  scale={[zoom * 0.3, zoom * 0.3, zoom * 0.3]}
                />
              )}
              {currentModelName === "sofa4" && (
                <Sofa4
                  sofa4={isPresenting}
                  position={position}
                  rotation={rotation}
                  scale={[zoom * 0.001, zoom * 0.001, zoom * 0.001]}
                />
              )}
              {currentModelName === "sofa5" && (
                <Sofa5
                  sofa5={isPresenting}
                  position={position}
                  rotation={rotation}
                  scale={[zoom * 0.5, zoom * 0.5, zoom * 0.5]}
                />
              )}
              {currentModelName === "sofa6" && (
                <Sofa6
                  sofa6={isPresenting}
                  position={position}
                  rotation={rotation}
                  scale={[zoom * 0.5, zoom * 0.5, zoom * 0.5]}
                />
              )}
              {currentModelName === "sofa7" && (
                <Sofa7
                  sofa7={isPresenting}
                  position={position}
                  rotation={rotation}
                  scale={[zoom * 0.5, zoom * 0.5, zoom * 0.5]}
                />
              )}
              {currentModelName === "lamp1" && (
                <Lamp1
                  lamp1={isPresenting}
                  position={position}
                  rotation={rotation}
                  scale={[zoom * 0.15, zoom * 0.15, zoom * 0.15]}
                />
              )}
              {currentModelName === "lamp2" && (
                <Lamp2
                  lamp2={isPresenting}
                  position={position}
                  rotation={rotation}
                  scale={[zoom * 0.0075, zoom * 0.0075, zoom * 0.0075]}
                />
              )}
              {currentModelName === "kitchen1" && (
                <Kitchen1
                  kitchen1={isPresenting}
                  position={position}
                  rotation={rotation}
                  scale={[zoom * 0.1, zoom * 0.1, zoom * 0.1]}
                />
              )}
              {currentModelName === "elevator1" && (
                <Elevator1
                  elevator1={isPresenting}
                  position={position}
                  rotation={rotation}
                  scale={[zoom * 0.2, zoom * 0.2, zoom * 0.2]}
                />
              )}
            </Fragment>
          );
        })}

      {isPresenting && (
        <Interactive onSelect={placeModel}>
          <mesh ref={reticleRef} rotation-x={-Math.PI / 2}>
            <ringGeometry args={[0.1, 0.25, 32]} />
            <meshStandardMaterial color={"white"} />
          </mesh>
        </Interactive>
      )}

      {!isPresenting && currentModelName === "chair1" && (
        <Chair1 chair={isPresenting} />
      )}
      {!isPresenting && currentModelName === "chair2" && (
        <Chair2 chair2={isPresenting} />
      )}
      {!isPresenting && currentModelName === "table1" && (
        <Table1 table1={isPresenting} />
      )}
      {!isPresenting && currentModelName === "table2" && (
        <Table2 table2={isPresenting} />
      )}
      {!isPresenting && currentModelName === "table3" && (
        <Table3 table3={isPresenting} />
      )}
      {!isPresenting && currentModelName === "table4" && (
        <Table4 table4={isPresenting} />
      )}
      {!isPresenting && currentModelName === "table5" && (
        <Table5 table5={isPresenting} />
      )}
      {!isPresenting && currentModelName === "sofa1" && (
        <Sofa1 sofa1={isPresenting} />
      )}
      {!isPresenting && currentModelName === "sofa2" && (
        <Sofa2 sofa2={isPresenting} />
      )}
      {!isPresenting && currentModelName === "sofa3" && (
        <Sofa3 sofa3={isPresenting} />
      )}
      {!isPresenting && currentModelName === "sofa4" && (
        <Sofa4 sofa4={isPresenting} />
      )}
      {!isPresenting && currentModelName === "sofa5" && (
        <Sofa5 sofa5={isPresenting} />
      )}
      {!isPresenting && currentModelName === "sofa6" && (
        <Sofa6 sofa6={isPresenting} />
      )}
      {!isPresenting && currentModelName === "sofa7" && (
        <Sofa7 sofa7={isPresenting} />
      )}
      {!isPresenting && currentModelName === "lamp1" && (
        <Lamp1 lamp1={isPresenting} />
      )}
      {!isPresenting && currentModelName === "lamp2" && (
        <Lamp2 lamp2={isPresenting} />
      )}
      {!isPresenting && currentModelName === "kitchen1" && (
        <Kitchen1 kitchen1={isPresenting} />
      )}
      {!isPresenting && currentModelName === "elevator1" && (
        <Elevator1 elevator1={isPresenting} />
      )}

      {/* Gesture binding */}
      {isPresenting && <>{bind}</>}
    </>
  );
};

export default XrOverlay;
