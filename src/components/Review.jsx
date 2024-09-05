// // import React from "react";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // // import "swiper/swiper-bundle.min.css";

// // import "../Css-Pages/HomeCard.css";

// // const testimonialData = [
// //   {
// //     avatar:
// //       "https://img.freepik.com/free-photo/woman-with-long-hair-yellow-hoodie-with-word-music-it_1340-39068.jpg",
// //     name: "Simonette Lindermann",
// //     review:
// //       "Mind-blowing discovery! changed my routine. Essential for everyone. A wise advice to all interested. Can't imagine without it!",
// //   },
// //   {
// //     avatar:
// //       "https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray_171337-629.jpg",
// //     name: "Merilee Beal",
// //     review:
// //       "Unbelievable gem! Altered my life. A must-have now. Wholeheartedly advise it to everyone. An absolute game-changer.",
// //   },
// //   // Add other testimonials here...
// // ];

// // function Review() {
// //   return (
// //     <Swiper
// //       grabCursor={true}
// //       centeredSlides={true}
// //       slidesPerView={2.3}
// //       loop={true}
// //       spaceBetween={30}
// //       effect="coverflow"
// //       coverflowEffect={{
// //         rotate: 0,
// //         depth: 800,
// //         slideShadows: true,
// //       }}
// //       pagination={{
// //         el: ".swiper-pagination",
// //         clickable: true,
// //       }}
// //       autoplay={{ delay: 500 }}
// //       breakpoints={{
// //         501: { slidesPerView: 2 },
// //         724: { slidesPerView: 2.3 },
// //         0: { slidesPerView: 1 }, // For screens smaller than 501px
// //       }}
// //     >
// //       {testimonialData.map((testimonial, index) => (
// //         <SwiperSlide key={index}>
// //           <div className="quote-container">
// //             <div className="star-rating">★★★★★</div>
// //             <p className="quote">{testimonial.review}</p>
// //             <div className="reviewer-photo">
// //               <img
// //                 src={testimonial.avatar}
// //                 width="140"
// //                 height="140"
// //                 alt={`Photo of ${testimonial.name}`}
// //               />
// //             </div>
// //             <div className="reviewer-details">
// //               <span className="name">{testimonial.name}</span>
// //               <span className="title">
// //                 Site Reliability Engineer at <strong>Google</strong>
// //               </span>
// //             </div>
// //             <div className="bottom">
// //               <svg width="100%" height="80">
// //                 <rect width="100%" height="80" className="shape-fill" />
// //               </svg>
// //               <svg
// //                 className="curves"
// //                 data-name="Layer 1"
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 viewBox="0 0 900 200"
// //                 preserveAspectRatio="none"
// //               >
// //                 <path
// //                   d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
// //                   opacity=".35"
// //                   className="shape-fill"
// //                 ></path>
// //                 <path
// //                   d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
// //                   className="shape-fill"
// //                 ></path>
// //               </svg>
// //             </div>
// //           </div>
// //         </SwiperSlide>
// //       ))}
// //       <div className="swiper-pagination"></div>
// //     </Swiper>
// //   );
// // }

// // export default Review;

// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";
// import { EffectCoverflow, Pagination, Autoplay } from "swiper";

// import "../Css-Pages/HomeCard.css";

// const testimonialData = [
//   {
//     avatar:
//       "https://img.freepik.com/free-photo/woman-with-long-hair-yellow-hoodie-with-word-music-it_1340-39068.jpg",
//     name: "Simonette Lindermann",
//     review:
//       "Mind-blowing discovery! changed my routine. Essential for everyone. A wise advice to all interested. Can't imagine without it!",
//   },
//   {
//     avatar:
//       "https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray_171337-629.jpg",
//     name: "Merilee Beal",
//     review:
//       "Unbelievable gem! Altered my life. A must-have now. Wholeheartedly advise it to everyone. An absolute game-changer.",
//   },
//   {
//     avatar:
//       "https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray_171337-629.jpg",
//     name: "Merilee Beal",
//     review:
//       "Unbelievable gem! Altered my life. A must-have now. Wholeheartedly advise it to everyone. An absolute game-changer.",
//   },
//   {
//     avatar:
//       "https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray_171337-629.jpg",
//     name: "Merilee Beal",
//     review:
//       "Unbelievable gem! Altered my life. A must-have now. Wholeheartedly advise it to everyone. An absolute game-changer.",
//   },
//   // Add other testimonials here...
// ];

// function Review() {
//   return (
//     <Swiper
//       modules={[EffectCoverflow, Pagination, Autoplay]}
//       grabCursor={true}
//       centeredSlides={true}
//       slidesPerView={2.3}
//       loop={true}
//       spaceBetween={30}
//       effect="coverflow"
//       coverflowEffect={{
//         rotate: 0,
//         depth: 800,
//         slideShadows: true,
//       }}
//       pagination={{
//         el: ".swiper-pagination",
//         clickable: true,
//       }}
//       autoplay={{ delay: 500 }}
//       breakpoints={{
//         501: { slidesPerView: 2 },
//         724: { slidesPerView: 2.3 },
//         0: { slidesPerView: 1 }, // For screens smaller than 501px
//       }}
//     >
//       {testimonialData.map((testimonial, index) => (
//         <SwiperSlide key={index}>
//           <div className="quote-container">
//             <div className="star-rating">★★★★★</div>
//             <p className="quote">{testimonial.review}</p>
//             <div className="reviewer-photo">
//               <img
//                 src={testimonial.avatar}
//                 width="140"
//                 height="140"
//                 alt={`Photo of ${testimonial.name}`}
//               />
//             </div>
//             <div className="reviewer-details">
//               <span className="name">{testimonial.name}</span>
//               <span className="title">
//                 Site Reliability Engineer at <strong>Google</strong>
//               </span>
//             </div>
//             <div className="bottom">
//               <svg width="100%" height="80">
//                 <rect width="100%" height="80" className="shape-fill" />
//               </svg>
//               <svg
//                 className="curves"
//                 data-name="Layer 1"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 900 200"
//                 preserveAspectRatio="none"
//               >
//                 <path
//                   d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
//                   opacity=".35"
//                   className="shape-fill"
//                 ></path>
//                 <path
//                   d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
//                   className="shape-fill"
//                 ></path>
//               </svg>
//             </div>
//           </div>
//         </SwiperSlide>
//       ))}
//       <div className="swiper-pagination"></div>
//     </Swiper>
//   );
// }

// export default Review;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper";

import "../Css-Pages/HomeCard.css";

const testimonialData = [
  {
    avatar:
      "https://img.freepik.com/free-photo/woman-with-long-hair-yellow-hoodie-with-word-music-it_1340-39068.jpg",
    name: "Simonette Lindermann",
    review:
      "Mind-blowing discovery! changed my routine. Essential for everyone. A wise advice to all interested. Can't imagine without it!",
  },
  {
    avatar:
      "https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray_171337-629.jpg",
    name: "Merilee Beal",
    review:
      "Unbelievable gem! Altered my life. A must-have now. Wholeheartedly advise it to everyone. An absolute game-changer.",
  },
  {
    avatar:
      "https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray_171337-629.jpg",
    name: "Merilee Beal",
    review:
      "Unbelievable gem! Altered my life. A must-have now. Wholeheartedly advise it to everyone. An absolute game-changer.",
  },
  {
    avatar:
      "https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray_171337-629.jpg",
    name: "Merilee Beal",
    review:
      "Unbelievable gem! Altered my life. A must-have now. Wholeheartedly advise it to everyone. An absolute game-changer.",
  },
  {
    avatar:
      "https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray_171337-629.jpg",
    name: "Merilee Beal",
    review:
      "Unbelievable gem! Altered my life. A must-have now. Wholeheartedly advise it to everyone. An absolute game-changer.",
  },
  // Add other testimonials here...
];

function Review() {
  return (
    <Swiper
      modules={[EffectCoverflow, Pagination, Autoplay]}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={2.3}
      loop={true}
      spaceBetween={40}
      effect="coverflow"
      coverflowEffect={{
        rotate: 0,
        depth: 800,
        slideShadows: true,
      }}
      pagination={{
        el: ".swiper-pagination",
        clickable: true,
      }}
      autoplay={{
        delay: 500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        501: { slidesPerView: 2 },
        724: { slidesPerView: 2.3 },
        0: { slidesPerView: 1 }, // For screens smaller than 501px
      }}
    >
      {testimonialData.map((testimonial, index) => (
        <SwiperSlide key={index}>
          <div className="quote-container">
            <div className="star-rating">★★★★★</div>
            <p className="quote">{testimonial.review}</p>
            <div className="reviewer-photo">
              <img
                src={testimonial.avatar}
                width="100"
                height="100"
                alt={`Photo of ${testimonial.name}`}
              />
            </div>
            <div className="reviewer-details">
              <span className="name">{testimonial.name}</span>
              <span className="title">
                Site Reliability Engineer at <strong>Google</strong>
              </span>
            </div>
            <div className="bottom">
              <svg width="100%" height="80">
                <rect width="100%" height="80" className="shape-fill" />
              </svg>
              <svg
                className="curves"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 900 200"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                  opacity=".35"
                  className="shape-fill"
                ></path>
                <path
                  d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                  className="shape-fill"
                ></path>
              </svg>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="swiper-pagination"></div>
    </Swiper>
  );
}

export default Review;
