import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Divider, Input, message, Modal, Table } from "antd";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import { Radio } from "antd";
import Swal from "sweetalert2";
import { icon } from "@fortawesome/fontawesome-svg-core";
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
  const offerDetails = adminOffer?.map((item) => item.offer_Details);
  const offer_id = adminOffer?.map((item) => item._id);

  const updateFormValues = () => {
    if (adminOffer && adminOffer.length > 0) {
      setValue("precentagee", adminOffer[0]?.offer);
      setValue("salesOffer", adminOffer[0]?.sales_timing);
    }
  };

  useEffect(() => {
    updateFormValues();
  }, [adminOffer]);

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
      key: "offer_text",
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
      .catch((error) => {});
  };

  const addOffer = () => {
    const offer = {
      offer_text: textArea,
    };
    axios
      .post(`${import.meta.env.VITE_MY_API}admin/offertext`, offer)
      .then((res) => {
        setTextArea("");
        setAddOfferModal(false);

        Swal.fire({
          icon: "success",
          title: "Added ",
          text: "Successfully Offer Added ",
        });
        fetchOffer();
      })
      .catch((errors) => {
        alert("Failed to add offer text.");
      });
  };

  const updateOfferText = () => {
    const offerText = {
      offer_text: editDetail.offer_text,
      _id: editDetail._id,
    };
    axios
      .put(`${import.meta.env.VITE_MY_API}admin/updateOffer`, { offerText })
      .then((res) => {
        fetchOffer();
        Swal.fire({
          icon: "success",
          title: "Updated",
          text: "Offer Updated ",
        });
        setEditOfferModal(false);
      })
      .catch((error) => {
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
          title: "Deleted",
          text: "Offer Deleted Succesfully",
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
        deleteOfferText(record._id);
      },
      onCancel() {},
    });
  };

  const handleTextAreaChange = (value) => {
    setTextArea(value);
  };

  const updateOffer = async (data) => {
    const percentage = {
      offer_id: offer_id,
      precentage: data.precentagee,
      sales_timing: data.salesOffer,
    };
    axios
      .put(`${import.meta.env.VITE_MY_API}admin/updateOffer`, {
        percentage,
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Updated",
          text: "Offer has been updated successfully",
        });
        setIsEditing(false);
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

  const inputBox = {
    width: "27%",
    marginBottom: "20px",
    padding: "12px",
    border: "2px solid #ff6f61",
    borderRadius: "10px",
    fontSize: "16px",
    boxShadow: "inset 0 2px 5px rgba(0, 0, 0, 0.1)",
  };

  const buttonUpdate = {
    backgroundColor: "#ff6f61",
    border: "none",
    padding: "12px ",
    borderRadius: "20px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
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
        <div
          className="d-flex flex-column align-items-center"
          style={{
            backgroundColor: "#ffffff",
            padding: "30px",
            maxWidth: "900px",
            margin: "20px auto",
          }}
        >
          <Divider
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#ff6f61",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "25px",
            }}
          >
            Offers Section
          </Divider>

          <div
            className="d-flex"
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <div>
              <input
                type="number"
                style={inputBox}
                disabled={!isEditing}
                {...register("precentagee", {
                  required: true,
                  valueAsNumber: true,
                  min: 0,
                  max: 99,
                })}
              />

              {errors.precentagee && (
                <p
                  style={{
                    color: "#ff4d4f",
                    fontSize: "14px",
                    marginTop: "5px",
                  }}
                >
                  {errors.precentagee?.type === "required"
                    ? "Offer is required"
                    : errors.precentagee?.type === "min"
                    ? "Offer must be at least 1"
                    : "Offer must be 99 or less"}
                </p>
              )}
            </div>
            <div>
              <input
                className="ms-3"
                type="number"
                style={inputBox}
                disabled={!isEditing}
                {...register("salesOffer", {
                  required: true,
                  valueAsNumber: true,
                })}
              />
              <MdEdit
                className="ms-3"
                style={{
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#ff6f61",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.2)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                onClick={() => editOffer()}
              />
            </div>

            <div
              className="form-group mt-4"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {isEditing && (
                <button
                  className="btn btn-primary"
                  type="primary"
                  style={buttonUpdate}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#e65b54";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#ff6f61";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  Update
                </button>
              )}
            </div>
          </div>
          <Table
            dataSource={offerDetails[0]}
            columns={columns.map((col) =>
              col.dataIndex === "offer_text"
                ? {
                    ...col,
                    render: (text) => (
                      <div
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "250px",
                          cursor: "pointer",
                          display: "inline-block",
                        }}
                        title={text}
                      >
                        {text}
                      </div>
                    ),
                  }
                : col
            )}
            style={{
              marginTop: "20px",
              width: "100%",
              border: "1px solid #ececec",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            scroll={{ x: "100%" }}
          />
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
            onClick={() => handleCancel()}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary mt-2 ms-4 modal-buttons"
            style={{ display: "flex", justifyContent: "end" }}
            onClick={() => addOffer()}
          >
            Add
          </button>
        </div>
      </Modal>
    </StyledOffer>
  );
};

export default Offer;
