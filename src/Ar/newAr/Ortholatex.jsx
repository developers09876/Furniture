import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useLocation } from "react-router-dom";

const Ortholatex = () => {
  const style = {
    display: "block",
    margin: "0 auto",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const { state } = useLocation();
  const caseType = state || "";

  const Latex_O_Pedic_Plus = useGLTF(
    "/public/3D-View-GLB/Latex_O_Pedic_Plus.glb"
  );
  const Organic_Posture_Pedic = useGLTF(
    "/public/3D-View-GLB/Organic_Posture_Pedic.glb"
  );
  const Ortho_Latex_O_Pedic = useGLTF(
    "/public/3D-View-GLB/Ortho_Latex_O_Pedic.glb"
  );
  const Ortho_Organic_Posture_Pedic = useGLTF(
    "/public/3D-View-GLB/Ortho_Organic_Posture_Pedic.glb"
  );
  const Ortho_Premium = useGLTF("/public/3D-View-GLB/Ortho_Premium.glb");
  const Ortho_Premium_ET = useGLTF("/public/3D-View-GLB/Ortho_Premium_ET.glb");
  const Ortho_Spine_Therapy_ET = useGLTF(
    "/public/3D-View-GLB/Ortho_Spine_Therapy_ET.glb"
  );
  const Sleep_In_Posture = useGLTF("/public/3D-View-GLB/Sleep_In_Posture.glb");
  const Supremo = useGLTF("/public/3D-View-GLB/Supremo.glb");
  const Supremo_ET = useGLTF("/public/3D-View-GLB/Supremo_ET.glb");

  const models = [
    { caseType: "33", object: Latex_O_Pedic_Plus.scene },
    { caseType: "34", object: Organic_Posture_Pedic.scene },
    { caseType: "35", object: Ortho_Latex_O_Pedic.scene },
    { caseType: "36", object: Ortho_Organic_Posture_Pedic.scene },
    { caseType: "37", object: Ortho_Premium.scene },
    { caseType: "38", object: Ortho_Premium_ET.scene },
    { caseType: "39", object: Ortho_Spine_Therapy_ET.scene },
    { caseType: "40", object: Sleep_In_Posture.scene },
    { caseType: "41", object: Supremo.scene },
    { caseType: "42", object: Supremo_ET.scene },
  ];

  const modelToRender = models.find(
    (model) => String(model.caseType) === String(caseType)
  );
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Canvas
        style={style}
        frameloop="demand"
        camera={{ position: [0, 0, 15], fov: 45, near: 0.1, far: 200 }}
      >
        <OrbitControls
          autoRotate
          enableZoom={true}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
          enablePan={false}
        />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {modelToRender && (
          <primitive
            object={modelToRender.object}
            scale={0.3}
            position={[0, 0, 0]}
          />
        )}

        {/* {caseType === "34" && (
          <primitive
            object={Latex_O_Pedic_Plus.scene}
            scale={0.3}
            position={[0, 0, 0]}
          />
        )}
        {caseType === "35" && (
          <primitive
            object={Organic_Posture_Pedic.scene}
            scale={0.3}
            position={[0, 0, 0]}
          />
        )}
        {caseType === "36" && (
          <primitive
            object={Ortho_Latex_O_Pedic.scene}
            scale={0.3}
            position={[0, 0, 0]}
          />
        )}
        {caseType === "37" && (
          <primitive
            object={Ortho_Organic_Posture_Pedic.scene}
            scale={0.3}
            position={[0, 0, 0]}
          />
        )}
        {caseType === "38" && (
          <primitive
            object={Ortho_Premium.scene}
            scale={0.3}
            position={[0, 0, 0]}
          />
        )}
        {caseType === "39" && (
          <primitive
            object={Ortho_Premium_ET.scene}
            scale={0.3}
            position={[0, 0, 0]}
          />
        )}
        {caseType === "40" && (
          <primitive
            object={Ortho_Spine_Therapy_ET.scene}
            scale={0.3}
            position={[0, 0, 0]}
          />
        )}
        {caseType === "41" && (
          <primitive
            object={Pocket_Spring_Latex_O_Pedic_Plus.scene}
            scale={0.3}
            position={[0, 0, 0]}
          />
        )}
        {caseType === "41" && (
          <primitive
            object={Sleep_In_Posture.scene}
            scale={0.3}
            position={[0, 0, 0]}
          />
        )}
        {caseType === "41" && (
          <primitive object={Supremo.scene} scale={0.3} position={[0, 0, 0]} />
        )}
        {caseType === "41" && (
          <primitive
            object={Supremo_ET.scene}
            scale={0.3}
            position={[0, 0, 0]}
          />
        )} */}
      </Canvas>
    </Suspense>
  );
};

export default Ortholatex;
