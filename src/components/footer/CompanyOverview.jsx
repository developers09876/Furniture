import Logo from "../Logo";
import Logo1 from "../../assets/Restopedic-logo.png";

const CompanyOverview = () => {
  return (
    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mt-2">
      <div className="mb-2">
        <a href="#" alt="Home" className="fw-bold text-decoration-none">
          {/* <Logo fontSize={30} width={150} /> */}
          {/* Restopedic */}
          <img
            src={Logo1}
            alt="Restropedic"
            style={{ fontSize: "20px", width: "150px" }}
          />
        </a>
      </div>
      <p>
        Elevate your lifestyle with our curated collection of high-quality
        products. From cutting-edge electronics to stylish home decor.
      </p>
    </div>
  );
};

export default CompanyOverview;
