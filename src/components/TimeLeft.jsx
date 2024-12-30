import axios from "axios";
import { useEffect, useState } from "react";

const Time = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [offer, setOffer] = useState([]);
  console.log("offer.sales_timing", offer);

  const fetchOffer = () => {
    axios
      .get(`${import.meta.env.VITE_MY_API}admin/getoffer`)
      .then((res) => {
        setOffer(res.data);
        console.log("res", res.data);
      })
      .catch((error) => {
        console.error("Error Fetching Offer", error);
      });
  };

  //   useEffect(() => {
  //     fetchOffer();
  //   }, [offer]);
  const calculateTimeLeft = (eventTime) => {
    const now = new Date();
    const timeLeft = eventTime - now;

    if (timeLeft <= 0) {
      return {
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return {
      hours: hours < 10 ? `0${hours}` : hours,
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds,
    };
  };

  const eventTime = new Date(
    new Date().getTime() + 1000 * 60 * 60 * offer[0]?.sales_timing
  );

  useEffect(() => {
    localStorage.setItem("eventTime", eventTime);
  }, []);

  const updateCountdown = () => {
    const timeLeft = calculateTimeLeft(eventTime);
    setTimeLeft(timeLeft);
    // console.log(
    //   `Time left: ${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`
    // );
  };

  useEffect(() => {
    const timerId = setInterval(updateCountdown);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div style={{ fontSize: "22px", color: "red", fontWeight: "bold" }}>
      {`${timeLeft.hours} : ${timeLeft.minutes} : ${timeLeft.seconds}`}
    </div>
  );
};
export default Time;
