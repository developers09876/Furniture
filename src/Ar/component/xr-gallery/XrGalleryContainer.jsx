import { Canvas } from "@react-three/fiber";
import { XR } from "@react-three/xr";
import { useCallback, useState, Suspense } from "react";
import { CharacterAnimationsProvider } from "../../contexts/ModelControl";
import XrGallery from "./XrGallery";
import { Environment } from "@react-three/drei";
import Interface from "./Interface";
import { Link } from "react-router-dom";

const XrGalleryContainer = () => {
  const shadowPos = [0, 0, 0];
  const [overlayContent, setOverlayContent] = useState(null);
  let interfaceRef = useCallback((node) => {
    if (node !== null) {
      setOverlayContent(node);
    }
  }, []);

  return (
    <CharacterAnimationsProvider>
      <Interface colapsed={close} arMode={true} ref={interfaceRef} />
      {/* <ARButton
        className="ar-button"
        sessionInit={{
          requiredFeatures: ["hit-test"],
          optionalFeatures: ["dom-overlay", "bounded-floor", "plane-detection"],
          domOverlay: { root: overlayContent },
        }}
      /> */}

      <Canvas
        shadows
        style={{ touchAction: "none", height: "100vh" }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[5, 10, 7.5]}
          intensity={0.1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <XR>
          <Suspense fallback={null}>
            <XrGallery />
          </Suspense>
        </XR>

        <Environment preset="sunset" />
      </Canvas>
      <Link to="/">
        <button className="back-btn" style={{ position: "relative" }}>
          Back
        </button>
      </Link>
    </CharacterAnimationsProvider>
  );
};

export default XrGalleryContainer;
