import Logo from "../Logo";

const CompanyOverview = () => {
  return (
    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mt-2">
      <div className="mb-2">
        <a href="#" alt="Home"      className="fw-bold text-decoration-none">
          {/* <Logo fontSize={30} width={150} /> */}
Furniture
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
