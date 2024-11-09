import { Carousel } from "react-bootstrap";
import styled from "styled-components";

<<<<<<< HEAD

=======
>>>>>>> 7897cee10415944a95c278bf826fde65e8fd26cc
const CarouselContainer = styled.div`
  .carousel-control-prev,
  .carousel-control-next {
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
<<<<<<< HEAD
    top: 50%; 
    transform: translateY(-50%); 
=======
    top: 50%;
    transform: translateY(-50%);
>>>>>>> 7897cee10415944a95c278bf826fde65e8fd26cc
    opacity: 0.8;
  }

  .carousel-control-prev {
<<<<<<< HEAD
    left: 200px; 
  }

  .carousel-control-next {
    right: 200px; 
=======
    left: 200px;
  }

  .carousel-control-next {
    right: 200px;
>>>>>>> 7897cee10415944a95c278bf826fde65e8fd26cc
  }
`;

const contentStyle = {
  width: "100%",
  height: "500px",
  color: "#000",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.5rem",
  backgroundColor: "#white",
  textAlign: "center",
};

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
  margin-left: 50px;
  font-weight: unbold;
  margin-bottom: 50px;
`;

const Description = styled.p`
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  max-width: 80%;
  text-align: center;
<<<<<<< HEAD
  justifyContent: center,
 
`;

const Position = styled.h4`
  color: #AC5FC1;
=======
  justifycontent: center;
`;

const Position = styled.h4`
  color: #ac5fc1;
>>>>>>> 7897cee10415944a95c278bf826fde65e8fd26cc
  font-size: 1.1rem;
  font-style: italic;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const AdditionalInfo = styled.p`
  color: #555;
  font-size: 1rem;
  text-align: center;
`;

const testimonials = [
  {
    title: "TESTIMONIALS",
<<<<<<< HEAD
    description: "I’m a testimonial,Click to edit me and add text that says something nice about you and your services.",
=======
    description:
      "I’m a testimonial,Click to edit me and add text that says something nice about you and your services.",
>>>>>>> 7897cee10415944a95c278bf826fde65e8fd26cc
    position: "Marketing Director",
    additionalInfo: "Rajan",
  },
  {
    title: "TESTIMONIALS",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    position: "Product Manager",
    additionalInfo: "Ajith",
  },
  {
    title: "TESTIMONIALS",
<<<<<<< HEAD
    description: "Vivamus luctus urna sed urna ultricies ac tempor dui sagittis",
=======
    description:
      "Vivamus luctus urna sed urna ultricies ac tempor dui sagittis",
>>>>>>> 7897cee10415944a95c278bf826fde65e8fd26cc
    position: "CEO",
    additionalInfo: "Gowtham",
  },
  {
    title: "TESTIMONIALS",
<<<<<<< HEAD
    description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames",
=======
    description:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames",
>>>>>>> 7897cee10415944a95c278bf826fde65e8fd26cc
    position: "Developer",
    additionalInfo: "Ganesh",
  },
];

<<<<<<< HEAD
const Review = () => (
=======
const ReviewCards = () => (
>>>>>>> 7897cee10415944a95c278bf826fde65e8fd26cc
  <CarouselContainer>
    <Carousel slide={true} interval={3000}>
      {testimonials.map((testimonial, index) => (
        <Carousel.Item key={index}>
          <div style={contentStyle}>
            <Title>{testimonial.title}</Title>
            <Description>
              {testimonial.description.split(",")[0]}
              <br />
              {testimonial.description.split(",")[1]}
            </Description>
            <Position>{testimonial.position}</Position>
            <AdditionalInfo>{testimonial.additionalInfo}</AdditionalInfo>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  </CarouselContainer>
);

<<<<<<< HEAD
export default Review;
=======
export default ReviewCards;
>>>>>>> 7897cee10415944a95c278bf826fde65e8fd26cc
