import { forwardRef } from "react";
import { Leva } from "leva";
import { useCharacterAnimations } from "../../contexts/ModelControl";
import { MdArrowBack } from "react-icons/md";
const Interface = forwardRef((props, ref) => {
  const { IsPresenting } = useCharacterAnimations();

  const handleClick = () => {
    window.location.reload();
  };

  return (
    <>
      <div
        ref={ref}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          touchAction: "none",
          width: "10px",
        }}
      >
        <Leva
          collapsed
          titleBar={{
            drag: false,
          }}
        />
        {IsPresenting && (
          <MdArrowBack
            onClick={handleClick}
            className="ar-back-btn"
            style={{ position: "absolute" }}
            size={"60px"}
          />
        )}
      </div>
    </>
  );
});

Interface.displayName = "Interface";
export default Interface;
