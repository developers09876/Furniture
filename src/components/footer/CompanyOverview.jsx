import Logo from "../Logo";
import Logo1 from "../../assets/Restopedic-logo.png";

const CompanyOverview = () => {
  return (
    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mt-2">
      <div className="mb-2">
        <a
          href="#"
          alt="Home"
          className="fw-bold text-decoration-none"
          style={{}}
        >
          {/* <Logo fontSize={30} width={150} /> */}
          {/* Restopedic */}

          <img
            src={Logo1}
            alt="Restropedic"
            style={{ fontSize: "20px", width: "150px" }}
          />
        </a>
      </div>
      <p style={{ textAlign: "justify" }}>
        Our products are designed to blend seamlessly and With innovative
        360-degree views and VR support, you can explore every detail of your
        desired furniture online.
      </p>
    </div>
  );
};

export default CompanyOverview;
