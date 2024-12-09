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
  const [textArea, setTextArea] = useState("");

  const [editOfferModal, setEditOfferModal] = useState(false);
  const [addOfferModal, setAddOfferModal] = useState(false);
  const [editDetail, setEditDetail] = useState([]);
  const [adminOffer, setAdminOffer] = useState([0]);
  const offerDetails = adminOffer?.map((item) => item.offer_Details);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

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
    const offer = {
      offer_text: editDetail.offer_text,
      _id: editDetail._id,
    };
    axios
      .put(`${import.meta.env.VITE_MY_API}admin/updateOfferText`, { offer })
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

  const onSubmit = async () => {
    const payload = {
      offer: textArea,
    };
    const editPayload = {
      offer: textArea,
    };
    console.log("addpayload", payload);
    console.log("payload", editPayload);

    // Decide API endpoint based on editing state
    const apiCall = isEditing
      ? axios.put(
          `${import.meta.env.VITE_MY_API}admin/updateOffer`,
          editPayload
        )
      : axios.post(`${import.meta.env.VITE_MY_API}admin/offer`, payload);

    // Handle API call
    apiCall
      .then((res) => {
        console.log("Response", res.data);
        alert(
          isEditing
            ? "Offer updated successfully!"
            : "Offer added successfully!"
        );
      })
      .catch((error) => {
        console.error("Error", error.response?.data || error.message);
        alert(isEditing ? "Failed to update offer!" : "Failed to add offer!");
      });
  };

  useEffect(() => {
    fetchOffer();
  }, [adminOffer]);

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-column align-items-center">
          <Divider style={{ fontSize: "30px" }}>Offers Section</Divider>

          {adminOffer.map((items) => (
            <>
              {/* <Radio.Group onChange={radioChange} value={value}>
                <Radio value={1}>On</Radio>
                <Radio value={2}>Off</Radio>
              </Radio.Group> */}
              {/* <div className="d-flex">
                <input
                  value={editValued !== null ? editValue : items.offer}
                  // value={items.offer}
                  type="number"
                  style={{ width: "18%", marginBottom: "20px" }}
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

                <MdEdit
                  className="ms-3"
                  style={{
                    fontSize: "20px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                  onClick={() => editOffer(items.offer)}
                  // onClick={() => editOffer()}
                />
              </div>
              <div
                className="form-group ms-1 mt-4 "
                // style={{ textAlign: "end" }}
              >
                {!isEditing && <Button type="primary">Submit</Button>}
                {isEditing && (
                  <Button type="primary" onClick={() => updateOffer()}>
                    update
                  </Button>
                )}
              </div> */}
            </>
          ))}

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
          placeholder="Enter Your Offer"
          value={editDetail.offer_text}
          onChange={(e) =>
            setEditDetail({ ...editDetail, offer_text: e.target.value })
          }
        />
        <button className="btn btn-primary mt-2 modal-buttons">Cancel</button>
        <button
          className="btn btn-primary mt-2 ms-3 modal-buttons "
          onClick={updateOfferText}
        >
          update
        </button>
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
        <button
          className="btn btn-primary mt-2 modal-buttons"
          onClick={addOffer}
        >
          Okay
        </button>
      </Modal>
    </StyledOffer>
  );
};

export default Offer;
