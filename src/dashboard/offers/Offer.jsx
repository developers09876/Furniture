import React, { useState } from "react";
import styled from "styled-components";
import { Divider, Input, Space } from "antd";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import axios from "axios";
const { TextArea } = Input;

const StyledOffer = styled.div`
  margin: 20px;
  margin-left: 250px;
  margin-right: auto;
  width: 100%;
`;

const Offer = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
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

  const onSubmit = async (offer) => {
    try {
      const payload = {
        offer: offer.offer,
        offer_Details: textArea && textArea.length > 0 ? textArea : [], // Ensure it's an array
      };

      const res = await axios.post(
        `${import.meta.env.VITE_MY_API}admin/offer`,
        payload
      );
      console.log("Added", res.data);
    } catch (error) {
      console.log("Not Added", error.response?.data || error.message);
    }
  };

  return (
    <StyledOffer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-column align-items-center">
          <Divider style={{ fontSize: "30px" }}>Offers Section</Divider>
          <input
            type="number"
            style={{ width: "8%", marginBottom: "20px" }}
            {...register("offer", {
              required: true,
              valueAsNumber: true,
              min: 1,
              max: 99,
            })}
          />
          {errors.offer && (
            <p style={{ color: "red" }}>
              {errors.offer?.type === "required"
                ? "Offer is required"
                : errors.offer?.type === "min"
                ? "Offer must be at least 1"
                : "Offer must be 99 or less"}
            </p>
          )}

          <button
            className="btn btn-primary"
            style={{ marginBottom: "20px" }}
            type="button"
            onClick={handleAddTextArea}
          >
            Add
          </button>

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
                placeholder={`Enter Offer Details ${index + 1}`}
                onChange={(e) => handleTextAreaChange(index, e.target.value)}
              />
              {textArea.length > 1 && (
                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "10px" }}
                  type="button"
                  onClick={() => handleRemoveTextArea(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <div className="form-group mt-4 " style={{ textAlign: "end" }}>
            <Button type="submit" className="me-2">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </StyledOffer>
  );
};

export default Offer;
