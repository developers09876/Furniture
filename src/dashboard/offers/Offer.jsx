import React, { useState } from "react";
import styled from "styled-components";
import { Button, Input } from "antd";

const { TextArea } = Input;

const StyledOffer = styled.div`
  margin: 20px;
  margin-left: 250px;
  margin-right: auto;
  width: 100%;
`;

const Offer = () => {
  const [textArea, setTextArea] = useState([""]);

  const handleAddTextArea = () => {
    setTextArea([...textArea, ""]);
  };

  const handleRemoveTextArea = (index) => {
    const updatedTextArea = [...textArea];
    updatedTextArea.splice(index, 1);
    setTextArea(updatedTextArea);
  };
  const handleTextAreaChange = (index, value) => {
    const updatedTextChange = [...textArea];
    updatedTextChange[index] = value;
    setTextArea(updatedTextChange);
  };
  return (
    <StyledOffer>
      <div className="d-flex flex-column align-items-center">
        {/* Add Button */}
        <Button
          style={{ marginInlineStart: "auto", marginBottom: "20px" }}
          type="primary"
          onClick={handleAddTextArea}
        >
          Add
        </Button>

        {textArea.map((value, index) => (
          <div
            className="d-flex"
            key={index}
            style={{
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <TextArea
              value={value}
              style={{ width: "400px" }}
              placeholder={`Enter Description ${index + 1}`}
              onChange={(e) => handleTextAreaChange(index, e.target.value)}
            />
            {textArea.length > 1 && (
              <Button
                style={{ marginLeft: "10px" }}
                type="primary"
                danger
                onClick={() => handleRemoveTextArea(index)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}
      </div>
    </StyledOffer>
  );
};

export default Offer;
