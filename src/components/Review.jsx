import React from 'react';
import { Card, Rate } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
// import AOS from 'aos';
import '../Css-Pages/HomeCard.css'


const reviews = [
  {
    id: 1,
    name: 'John',
    content: 'The services provided by the officials was smooth and satisfactory.Products and goods delivered were up to satisfaction and compared to market price.',
    rating: 4,
    profilePic: 'https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg',
    bgImage: 'https://media.istockphoto.com/id/1398999936/vector/illustration-of-light-blue-dots-and-striped-circles-pattern-background.jpg?s=612x612&w=0&k=20&c=4277V1AOFLZoU4qsrM99_JrimDq5Cbg6Bxc7Fk7yUJY=',
  },
  {
    id: 2,
    name: 'Rajan',
    content: 'Have become a regular customer in a very short span of time. Very approachable staff, service and delivery on time.Satisfied with products,Timely delivery.',
    rating: 5,
    profilePic: 'https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg',
    bgImage: 'https://media.istockphoto.com/id/1398999936/vector/illustration-of-light-blue-dots-and-striped-circles-pattern-background.jpg?s=612x612&w=0&k=20&c=4277V1AOFLZoU4qsrM99_JrimDq5Cbg6Bxc7Fk7yUJY=',
  },
  {
    id: 3,
    name: 'pooja',
    content: 'We purchased so many products from durian and we would recommend Durian Furniture to everyone who needs quality and decent looking furniture.',
    rating: 5,
    profilePic: 'https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg',
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
    <Container >
      {/* data-aos="zoom-out"  */}
      <Row className="g-4">
        <h2 style={{ textAlign: 'center', textDecorationLine: 'underline', textDecorationColor: '#7FAFEB', padding: '1px 1px 3px 3px' }}>Testimonial</h2>
        {reviews.map((review) => (
          <Col lg={4} md={6} sm={12} key={review.id}>
            <Card
              className="custom-card"
              hoverable


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
              <Rate className='custom-rate' disabled defaultValue={review.rating} />
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ReviewCards;

