import axios from "axios";
import { useEffect, useState } from "react";

const Time = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [offer, setOffer] = useState([]);
  const [eventTime, setEventTime] = useState(null);

  // Fetch offer data
  const fetchOffer = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_MY_API}admin/getoffer`
      );
      setOffer(res.data);
    } catch (error) {
      console.error("Error Fetching Offer", error);
    }
  };

  // Calculate time left
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

  // Update countdown
  const updateCountdown = () => {
    if (eventTime) {
      const timeLeft = calculateTimeLeft(eventTime);
      setTimeLeft(timeLeft);
    }
  };

  // Fetch offer data on mount
  useEffect(() => {
    fetchOffer();
  }, []);

  // Recalculate eventTime when offer changes
  useEffect(() => {
    if (offer.length > 0) {
      const newEventTime = new Date(
        new Date().getTime() + 1000 * 60 * 60 * offer[0]?.sales_timing
      );
      setEventTime(newEventTime);
      localStorage.setItem("eventTime", newEventTime);
    }
  }, [offer]);

  // Start countdown when eventTime is set
  useEffect(() => {
    if (eventTime) {
      const timerId = setInterval(updateCountdown, 1000);
      return () => clearInterval(timerId);
    }
  }, [eventTime]);

  return (
    <div style={{ fontSize: "22px", color: "red", fontWeight: "bold" }}>
      {`${timeLeft.hours} : ${timeLeft.minutes} : ${timeLeft.seconds}`}
    </div>
  );
};

export default Time;
