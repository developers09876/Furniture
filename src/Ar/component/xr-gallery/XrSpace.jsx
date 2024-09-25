import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { XR, useXR } from "@react-three/xr";
import { Suspense } from "react";

const ARScene = () => {
  return (
    <Suspense fallback={null}>
      <Canvas>
        <XR>
          <ARContent />
        </XR>
      </Canvas>
    </Suspense>
    // <Canvas>
    //   <ambientLight />
    //   <XR>
    //     <ARContent />
    //   </XR>
    // </Canvas>
  );
};

const ARContent = () => {
  const xr = useXR();
  const contentRef = useRef();

  useEffect(() => {
    if (xr.isPresenting) {
      // Access XR session and configure absolute scale
      const xrSession = xr.getSession();
      if (xrSession && xrSession.requestReferenceSpace) {
        xrSession.requestReferenceSpace("local").then((referenceSpace) => {
          // Assume 1 unit in your scene represents 1 meter in the real world
          const scale = 0.1; // Adjust this value based on your real-world scale
          contentRef.current.scale.set(scale, scale, scale);

          xrSession.updateRenderState({
            baseLayer: new XRWebGLLayer(xrSession, contentRef.current),
          });
          xrSession.requestAnimationFrame((time, frame) => {
            xrSession.updateRenderState({ depthNear: 0.1, depthFar: 1000 });
            xrSession.requestAnimationFrame(() => {});
          });
          xrSession.requestAnimationFrame(() => {});
        });
      }
    }
  }, [xr.isPresenting]);
  useEffect(() => {
    const { gl } = useThree(); // Ensure we are getting the WebGLRenderer
    if (gl.xr && gl.xr.setWebXRManager) {
      gl.xr.setWebXRManager(true); // Enable WebXR
    } else {
      console.error("WebXRManager is not available.");
    }
  }, []);
  return (
    <group ref={contentRef}>
      {/* Your AR content goes here */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </group>
  );
};

export default ARScene;
