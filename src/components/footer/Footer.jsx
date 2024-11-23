// font awesome icons
import {
  faFacebookF,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// styled components
import { styled } from "styled-components";

// components
import CompanyOverview from "./CompanyOverview";
import Copieright from "./Copyright";
import { Link } from "react-router-dom";
import "../../Css-Pages/WallBackground.css";

// Styled components
const SocialMediaSection = styled.section`
  border-bottom: 1px solid #ddd;
`;

const SocialMediaLink = styled.a`
  font-size: 17px;
  margin-right: 1rem;
  transition: ${(props) => props.theme.transition};

  &:hover {
    color: ${(props) => props.theme.mainColorLight}!important;
  }
`;

const FooterLink = styled(Link)`
  transition: ${(props) => props.theme.transition};

  &:hover {
    color: ${(props) => props.theme.mainColorLight}!important;
  }
`;

const FooterHeading = styled.h6`
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.footerHeadingColor};
`;
//
const SectionWrapper = styled.section`
  background-color: var(--bgColor);
`;

const Footer = () => {
  return (
    <>
      <footer className="text-center text-lg-start  text-muted ">
        <SectionWrapper>
          <SocialMediaSection className="d-flex justify-content-center justify-content-lg-between px-4 py-3 border-bottom">
            <div className="me-5 d-none d-lg-block">
              <span>Get connected with us on social networks:</span>
            </div>
            <div>
              <SocialMediaLink href="#" className="me-4 text-reset">
                <FontAwesomeIcon icon={faFacebookF} />
              </SocialMediaLink>

              <SocialMediaLink href="#" className="me-4 text-reset">
                <FontAwesomeIcon icon={faInstagram} />
              </SocialMediaLink>
              <SocialMediaLink href="#" className="me-4 text-reset">
                <FontAwesomeIcon icon={faYoutube} />
              </SocialMediaLink>
            </div>
          </SocialMediaSection>

          <div className="container text-center text-md-start ">
            <div className="row">
              <CompanyOverview />

              <div className="col-md-2 col-xl-2 mx-auto mt-4">
                <FooterHeading className="text-uppercase fw-bold mb-2">
                  Pages
                </FooterHeading>
                <p>
                  <FooterLink
                    to="/"
                    className="text-reset text-decoration-none"
                  >
                    Home
                  </FooterLink>
                </p>
                <p>
                  <FooterLink
                    to="/about"
                    className="text-reset text-decoration-none"
                  >
                    About
                  </FooterLink>
                </p>
                <p>
                  <FooterLink
                    to="/products"
                    className="text-reset text-decoration-none"
                  >
                    Products
                  </FooterLink>
                </p>
              </div>

              <div className="col-md-2  col-xl-2 mx-auto mt-4">
                <FooterHeading className="text-uppercase fw-bold mb-2">
                  Company
                </FooterHeading>
                <p>
                  <FooterLink
                    href="#"
                    className="text-reset text-decoration-none"
                  >
                    FAQs
                  </FooterLink>
                </p>
                <p>
                  <FooterLink
                    href="#"
                    className="text-reset text-decoration-none"
                  >
                    Blog
                  </FooterLink>
                </p>
              </div>

              <div className="col-md-4 col-xl-3 mx-auto mb-md-0 mt-4 text-center text-md-start">
                <FooterHeading className="text-uppercase fw-bold mb-2">
                  Contact
                </FooterHeading>

                <p
                  className="d-flex align-items-center justify-content-center justify-content-md-start"
                  style={{ width: "max-content" }}
                >
                  <FontAwesomeIcon
                    // icon={faLocationDot}
                    className="me-2"
                    style={{ fontSize: "17px" }}
                  />
                  <div class="address">
                    <p className="address-detail">
                      Registered Office, Manufacturer & Packer,
                      <br />
                      #192, Sy No. 124, Halagevaderahalli, <br />
                      Bengaluru , &nbsp; Karnataka <br /> India.
                    </p>

                    <p className="d-flex align-items-center justify-content-center justify-content-md-start">
                      <FontAwesomeIcon
                        icon={faPhone}
                        // className="me-2"
                        // style={{ fontSize: "17px" }}
                      />{" "}
                      +91 910 855 9999
                    </p>
                  </div>
                </p>
                <p className="d-flex align-items-center justify-content-center justify-content-md-start">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    // className="me-2"
                    // style={{ fontSize: "17px" }}
                  />
                  &nbsp; restonindia@gmail.com
                </p>
              </div>
            </div>
          </div>
        </SectionWrapper>
        <Copieright />
      </footer>
    </>
  );
};

export default Footer;
