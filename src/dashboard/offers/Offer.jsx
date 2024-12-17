import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Divider, Input, message, Modal, Table } from "antd";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import { Radio } from "antd";
import Swal from "sweetalert2";
const { confirm } = Modal;
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
    setValue,
  } = useForm();

  const [textArea, setTextArea] = useState("");
  const [editOfferModal, setEditOfferModal] = useState(false);
  const [addOfferModal, setAddOfferModal] = useState(false);
  const [editDetail, setEditDetail] = useState([]);
  const [adminOffer, setAdminOffer] = useState([0]);
  console.log("adminOffer", adminOffer);
  const offerDetails = adminOffer?.map((item) => item.offer_Details);
  const offer_id = adminOffer?.map((item) => item._id);
  console.log("tyid", offer_id);
  useEffect(() => {
    if (adminOffer && adminOffer.length > 0) {
      setValue("precentagee", adminOffer[0]?.offer); // Set first item's offer
    }
  }, [adminOffer, setValue]);

  const [isEditing, setIsEditing] = useState(false);

  const columns = [
    {
      title: "S.No",
      render: (i, record, index) => (
        <div>
          <p>{1 + index}</p>
        </div>
      ),
    },
    {
      title: "Offers",
      dataIndex: "offer_text",
    },
    {
      title: "Action",
      render: (_, record) => (
        <div>
          <MdEdit
            style={{
              fontSize: "20px",
              cursor: "pointer",
              marginRight: "10px",
            }}
            onClick={() => editModal(record)}
          />

          <MdDelete
            style={{ fontSize: "20px", cursor: "pointer", color: "red" }}
            onClick={() => deleteOffer(record)}
          />
        </div>
      ),
    },
  ];

  const handleOk = () => {
    setEditOfferModal(false);
    setAddOfferModal(false);
  };
  const handleCancel = () => {
    setEditOfferModal(false);
    setAddOfferModal(false);
  };
  const editModal = (record) => {
    setEditOfferModal(true);
    setEditDetail(record);
  };

  const fetchOffer = () => {
    axios
      .get(`${import.meta.env.VITE_MY_API}admin/getoffer`)
      .then((res) => {
        setAdminOffer(res.data);
      })
      .catch((error) => {
        console.error("Error Fetching Offer", error);
      });
  };

  const addOffer = () => {
    const offer = {
      offer_text: textArea,
    };
    axios
      .post(`${import.meta.env.VITE_MY_API}admin/offertext`, offer)
      .then((res) => {
        console.log("Added Offer Text", res);
        setTextArea("");
        setAddOfferModal(false);
      })
      .catch((errors) => {
        console.error({ message: errors });
        alert("Failed to add offer text.");
      });
  };

  const updateOfferText = () => {
    const offerText = {
      offer_text: editDetail.offer_text,
      _id: editDetail._id,
    };
    axios
      .put(`${import.meta.env.VITE_MY_API}admin/updateOfferText`, { offerText })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Updated",
          text: "Offer Updated ",
        });
        setEditOfferModal(false);
      })
      .catch((error) => {
        console.log("error", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Error Accur during the Update...",
        });
      });
  };

  const deleteOfferText = (_id) => {
    axios
      .delete(`${import.meta.env.VITE_MY_API}admin/deleteOfferText/${_id}`)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Delted",
          text: "Offer Delted Succesfully",
        });
        fetchOffer();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error ",
          text: `Error Accur During Update..`,
        });
      });
  };
  const deleteOffer = (record) => {
    confirm({
      title: `Are you sure you want to delete ${record.offer_text}?`,
      icon: <MdDelete style={{ fontSize: "20px", color: "red" }} />,
      content: `Name: ${record.offer_text}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteOfferText(record._id); // Use the _id to call the API for deletion
      },
      onCancel() {
        console.log("Delete cancelled");
      },
    });
  };

  const handleTextAreaChange = (value) => {
    setTextArea(value);
  };

  // const onSubmit = async () => {

  //   const editPayload = {
  //     offer: textArea,
  //   };
  //   console.log("payload", editPayload);

  //   axios
  //     .put(`${import.meta.env.VITE_MY_API}admin/updateOffer`, editPayload)

  //     .then((res) => {
  //       console.log("Response", res.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error", error.response?.data || error.message);
  //     });
  // };

  const updateOffer = async (data) => {
    const precentage = { precentage: data.precentagee, offer_id: offer_id };
    console.log("apiprecentage", precentage);

    axios
      .put(`${import.meta.env.VITE_MY_API}admin/updateOffer`, {
        precentage,
      })
      .then((res) => {
        Swal.fire(
          `Updated!!`,
          `offer Has been Updated Successfully `,
          `Success`
        );
        console.log("res.data", res.data);
      })
      .catch(() => {
        Swal.fire(`Occur Error`, `Not Updated`, `error`);
      });
  };

  useEffect(() => {
    fetchOffer();
  }, [editOfferModal]);

  const editOffer = () => {
    setIsEditing(true);
  };

  return (
    <StyledOffer>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <button
          className="btn btn-primary"
          onClick={() => setAddOfferModal(true)}
        >
          Add Offer
        </button>
      </div>
      <form onSubmit={handleSubmit(updateOffer)}>
        <div className="d-flex flex-column align-items-center">
          <Divider style={{ fontSize: "30px" }}>Offers Section</Divider>

          <div className="d-flex">
            <input
              type="number"
              style={{ width: "25%", marginBottom: "20px" }}
              {...register("precentagee", {
                required: true,
                valueAsNumber: true,
                min: 0,
                max: 99,
              })}
            />
            <MdEdit
              className="ms-3"
              style={{
                fontSize: "20px",
                cursor: "pointer",
                marginRight: "10px",
              }}
              onClick={() => editOffer()}
            />
            {errors.precentagee && (
              <p style={{ color: "red" }}>
                {errors.precentagee?.type === "required"
                  ? "Offer is required"
                  : errors.precentagee?.type === "min"
                  ? "Offer must be at least 1"
                  : "Offer must be 99 or less"}
              </p>
            )}
          </div>
          <div className="form-group ms-1 mt-4 ">
            {isEditing && (
              <button className="btn btn-primary" type="primary">
                update
              </button>
            )}
          </div>

          <Table dataSource={offerDetails[0]} columns={columns} />
        </div>
      </form>
      <Modal
        title="Edit Offer"
        open={editOfferModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Input
          value={editDetail.offer_text}
          onChange={(e) =>
            setEditDetail({ ...editDetail, offer_text: e.target.value })
          }
        />
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button
            className="btn btn-primary mt-4 modal-buttons"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary mt-4 ms-3 modal-buttons "
            onClick={updateOfferText}
          >
            update
          </button>
        </div>
      </Modal>
      <Modal
        title="Add Offer"
        open={addOfferModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <TextArea
          value={textArea}
          placeholder={`Enter Your Offer Description `}
          onChange={(e) => handleTextAreaChange(e.target.value)}
        />
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button
            className="btn btn-primary mt-2 modal-buttons"
            style={{ display: "flex", justifyContent: "end" }}
            onClick={() => addOffer()}
          >
            Okay
          </button>
        </div>
      </Modal>
    </StyledOffer>
  );
};

export default Offer;
