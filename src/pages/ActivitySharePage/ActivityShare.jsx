import React, { useEffect, useState } from "react";
import styles from "./ActivityShare.module.css";
import { IoMdClose } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { showToast } from "../../components/Toast/Toast";
import Navbar from "../../components/Navbar/Navbar";

function ActivityShare() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activityLink, setActivityLink] = useState("");
  const [activityType, setActivityType] = useState("");

  const hancleCloseBtnCLick = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    if (location.state) {
      setActivityLink(
        `${import.meta.env.VITE_HOST}quiz/${location.state.activityId}/`
      );
      setActivityType(location.state.activityType);
    }
  }, []);

  const handleShareBtnClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(activityLink);
    showToast("Link copied to Clipboard", "success");
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <Navbar />
        <div className={styles.modelContainer}>
          <div className={styles.modelContent}>
            <div className={styles.activityDetailsContainer}>
              <span className={styles.activityMessage}>
                Congrats your {activityType} is Published!
              </span>
              <span className={styles.link}>{activityLink}</span>
              <button
                className={styles.shareButton}
                onClick={handleShareBtnClick}
              >
                Share
              </button>
            </div>
            <span
              className={styles.modelCloseBtn}
              onClick={hancleCloseBtnCLick}
            >
              <IoMdClose />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActivityShare;
