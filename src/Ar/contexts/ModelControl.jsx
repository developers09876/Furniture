import { useControls } from "leva";
import { createContext, useContext, useState, useEffect } from "react";

const CharacterAnimationsContext = createContext({});

export const CharacterAnimationsProvider = (props) => {
  console.log("modelcontrol pops", props);
  const [IsDrag, SetDrag] = useState(false);
  const [IsPresenting, SetPresenting] = useState(false);
  const [currentColor, setCurrentColor] = useState("#ffffff");
  let path = window.location.pathname.substring(1);
  const [currentModelName, setCurrentModelName] = useState(path);
  console.log("currentModelName", currentModelName);
  const { Color } = useControls({
    Color: {
      options: {
        Original: "#ffffff",
        Blue: "#0B60B0",
        Green: "#65B741",
        Orange: "#EE7214",
      },
      onChange: (Val) => {
        setCurrentColor(Val);
      },
    },
    Model: {
      value: currentModelName,
      options: {
        "Sofa 1": "sofa1",
        "Sofa 2": "sofa2",
        "Sofa 3": "sofa3",
        "Sofa 4": "sofa4",
        "Sofa 5": "sofa5",
        "Sofa 6": "sofa6",
        "Chair 1": "chair1",
        "Chair 2": "chair2",
        "Table 1": "table1",
        "Table 2": "table2",
        "Table 3": "table3",
        "Table 4": "table4",
        "Table 5": "table5",
        "Lamp 1": "lamp1",
        "Lamp 2": "lamp2",
        "Kitchen 1": "kitchen1",
        "Elevator 1": "elevator1",
      },
      onChange: (value) => {
        setCurrentModelName(value);
      },
    },
  });

  useEffect(() => {
    setCurrentModelName((prevModelName) => {
      if (path !== prevModelName) {
        return path;
      }
      return prevModelName;
    });
  }, [path]);

  return (
    <CharacterAnimationsContext.Provider
      value={{
        currentModelName,
        setCurrentModelName,
        Color,
        IsDrag,
        SetDrag,
        currentColor,
        setCurrentColor,
        SetPresenting,
        IsPresenting,
      }}
    >
      {props.children}
    </CharacterAnimationsContext.Provider>
  );
};

export const useCharacterAnimations = () => {
  return useContext(CharacterAnimationsContext);
};
