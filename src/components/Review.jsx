import React from 'react';
import { Card, Rate } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
// import AOS from 'aos';
import '../Css-Pages/HomeCard.css'


const reviews = [
  {
    id: 1,
    name: 'John Doe',
    content: 'The services provided by the officials was smooth and satisfactory. Products and goods delivered were up to satisfaction and compared to market price.',
    rating: 4,
    profilePic: 'https://media.istockphoto.com/id/1398385367/photo/happy-millennial-business-woman-in-glasses-posing-with-hands-folded.jpg?s=612x612&w=0&k=20&c=Wd2vTDd6tJ5SeEY-aw0WL0bew8TAkyUGVvNQRj3oJFw=',
    bgImage: 'https://media.istockphoto.com/id/1398999936/vector/illustration-of-light-blue-dots-and-striped-circles-pattern-background.jpg?s=612x612&w=0&k=20&c=4277V1AOFLZoU4qsrM99_JrimDq5Cbg6Bxc7Fk7yUJY=', 
  },
  {
    id: 2,
    name: 'Jane Smith',
    content: 'Have become a regular customer in a very short span of time. Very approachable staff, service and delivery on time.Satisfied with products,Timely delivery.',
    rating: 5,
    profilePic: 'https://img.freepik.com/free-photo/young-woman-wearing-striped-shirt-eyeglasses_273609-13226.jpg',
    bgImage: 'https://media.istockphoto.com/id/1398999936/vector/illustration-of-light-blue-dots-and-striped-circles-pattern-background.jpg?s=612x612&w=0&k=20&c=4277V1AOFLZoU4qsrM99_JrimDq5Cbg6Bxc7Fk7yUJY=',
  },
  {
    id: 3,
    name: 'pooja',
    content: 'We purchased so many products from durian and we would recommend Durian Furniture to everyone who needs quality and decent looking furniture.',
    rating: 5,
    profilePic: 'https://t3.ftcdn.net/jpg/02/81/81/86/360_F_281818663_XXRCNuGktKeZsnknqWkKI0rR4JPWui3H.jpg',
    bgImage: 'https://media.istockphoto.com/id/1398999936/vector/illustration-of-light-blue-dots-and-striped-circles-pattern-background.jpg?s=612x612&w=0&k=20&c=4277V1AOFLZoU4qsrM99_JrimDq5Cbg6Bxc7Fk7yUJY=',
  },
 ];

  // useEffect(() => {
  //   AOS.init({
  //     duration: 1000, 
  //   });
  // }, []);

const ReviewCards = () => {
  return (
    <Container>
      <Row className="g-4">
        <h1 style={{textAlign:'center',fontSize:'36.7px',fontStyle:'poppins,sans-serif',color:'#212529'}}>Testimonial</h1>
        {reviews.map((review) => (
          <Col lg={4} md={6} sm={12} key={review.id}> 
            <Card
              className="custom-card"
              hoverable
              // data-aos="zoom-out" 
              style={{
                borderRadius: '15px',
                backgroundImage: `url(${review.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="profile-container">
                <img
                  src={review.profilePic}
                  alt={review.name}
                  className="profile-pic"
                />
              </div>
              <h4>{review.name}</h4>
              <p>{review.content}</p>
              <Rate style={{marginLeft:'70px'}}disabled defaultValue={review.rating} />
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ReviewCards;

