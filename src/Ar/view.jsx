import React from "react";
import ThreeSixty from "react-360-view";
function view() {
  return (
    <div>
      <ThreeSixty
        amount={36}
        imagePath="https://d7o4fs.csb.app/images/"
        fileName="frame-{index}.jpg?v1"
        boxShadow={true}
        paddingIndex={true}
      />
    </div>
  );
}

export default view;
