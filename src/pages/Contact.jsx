import styled from "styled-components";
import Swal from "sweetalert2";
import Breadcrumb from "../components/Breadcrumb";
import { useEffect } from "react";
import Button from "../components/Button";
import emailjs from "emailjs-com";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";

const ContactSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContactBox = styled.div`
  width: clamp(100px, 90%, 1000px);
  display: flex;
  flex-wrap: wrap;
`;

const StyledMap = styled.div`
  width: 50%;
  height: 530px !important;

  @media only screen and (max-width: 800px) {
    width: 100%;
    border-radius: 0 0 10px 10px;
  }
`;

const ContactFormWrapper = styled.div`
  width: 50%;
  padding: 8% 5% 10% 5%;
  height: 500px;
  // background-color: #fdf1e9;
  background-color: var(--bgColor);
  border-radius: 0 10px 10px 0;

  @media only screen and (max-width: 800px) {
    width: 100%;
    border-radius: 0 0 10px 10px;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormItem = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  outline: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 12px;
  font-size: clamp(15px, 1.5vw, 18px);
`;

const TextArea = styled.textarea`
  width: 100%;
  outline: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 12px;
  font-size: clamp(15px, 1.5vw, 18px);
`;

const sendMessage = async (form) => {
  try {
    // Use emailjs to send the message via email
    const templateParams = {
      name: form.name,
      email: form.email,
      message: form.message,
    };

    await emailjs.send(
      "service_vg2a0g3",
      "template_vd0rq39",
      templateParams,
      "uR-pWmuRecgQJO4mA"
    );
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const Contact = () => {
  const handleFormSubmit = async (data) => {
    const details = {
      name: data.name,
      email: data.email,
      message: data.textarea,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MY_API}User/enquiry`,
        details
      );
      Swal.fire({
        icon: "success",
        title: "Mail was successfully sent",
        showConfirmButton: true,
        timer: 1000,
      });

      reset({
        name: "",
        email: "",
        textarea: "",
      });
    } catch (error) {
      console.error("Error occurred:", error);

      Swal.fire({
        icon: "error",
        title: "Failed to send message",
        text: "Please try again later",
        showConfirmButton: true,
      });
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <>
      <Breadcrumb />
      {/* <h1 className='text-center my-5 px-3'>Reach Out and Connect with Us</h1> */}
      <h2 className="text-center my-5 px-3">Contact with Us</h2>

      <ContactSection id="contact">
        <ContactBox className="contact-box">
          <StyledMap>
            <div>
              <iframe
                width="100%"
                height="500"
                src="https://maps.google.com/maps?width=100%25&amp;height=443&amp;hl=en&amp;q=bangalore,%20karnataka,%20india+(EShop)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              >
                <a href="https://www.maps.ie/population/">
                  Population Estimator map
                </a>
              </iframe>
            </div>
          </StyledMap>
          <ContactFormWrapper className="contact-form-wrapper">
            <ContactForm onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  placeholder="Enter Your Name"
                  type="text"
                  className="form-control"
                  id="name"
                  {...register("name", {
                    required: "Name is required",
                    validate: (value) =>
                      /^[a-zA-Z\s]+$/.test(value) ||
                      "Name must not contain special characters or numbers",
                  })}
                />
                {errors.name && (
                  <p
                    style={{ color: "red", position: "absolute" }}
                    role="alert"
                  >
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    validate: {
                      validFormat: (value) =>
                        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})$/i.test(
                          value
                        ) || "Invalid email format",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="email"
                      placeholder="Enter Your Email"
                      status={errors.email ? "error" : ""}
                    />
                  )}
                />
                {errors.email && (
                  <p
                    style={{ color: "red", position: "absolute" }}
                    role="alert"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <label htmlFor="textarea" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="textarea"
                  placeholder="Type your message here"
                  {...register("textarea", {
                    required: "Message must be at least 5 characters",
                    minLength: {
                      value: 5,
                      message: "Message must be at least 5 characters",
                    },
                  })}
                ></textarea>
                {errors.textarea && (
                  <p
                    style={{ color: "red", position: "absolute" }}
                    role="alert"
                  >
                    {errors.textarea.message}
                  </p>
                )}
              </div>

              <Button className="mt-5" type="submit">
                Send
              </Button>
            </ContactForm>
          </ContactFormWrapper>
        </ContactBox>
      </ContactSection>
      <br />
    </>
  );
};

export default Contact;
