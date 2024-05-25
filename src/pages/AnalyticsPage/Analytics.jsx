import React, { useEffect, useState } from "react";
import styles from "./Analytics.module.css";
import Navbar from "../../components/Navbar/Navbar";
import AnalyticsTable from "../../components/Analytics/AnalyticsTable";
import BASE_URL from "../../utils/Constants";
import { showToast } from "../../components/Toast/Toast";
import axios from "axios";

function Analytics() {
  const [activityId, setActivitiesId] = useState("");
  const [activitiesData, setActivitiesData] = useState([]);
  const [modelVisibility, setModelVisibility] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  axios.defaults.headers.common["Authorization"] = token;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/activity/activities`, {
        userId,
      });

      const activityData = response.data.data.activity;

      setActivitiesData(activityData);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something Went Wrong!";
      showToast(errorMessage, "error");
      setActivitiesData([]);
    }
  };

  const deleteActivity = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/activity/${activityId}`);
      showToast(response.data.message, "success");
      fetchData(); // Fetch data again after successful delete
      setModelVisibility(!modelVisibility);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something Went Wrong!";
      showToast(errorMessage, "error");
    }
  };

  const handleDeleteBtnClick = (activityId) => {
    setModelVisibility(!modelVisibility);
    setActivitiesId(activityId);
  };

  const handleCancelBtnClick = () => {
    setModelVisibility(!modelVisibility);
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <Navbar />
        <div className={styles.activityTableContainer}>
          <AnalyticsTable
            activityData={activitiesData}
            deleteActivity={handleDeleteBtnClick}
          />
        </div>
      </div>
      <div className={modelVisibility ? styles.modelContainer : styles.close}>
        <div className={styles.modelContent}>
          <div className={styles.message}>
            Are you confirm you want to delete ?
          </div>
          <div className={styles.footerContainer}>
            <button className={styles.deleteButton} onClick={deleteActivity}>
              Confirn Delete
            </button>
            <button
              className={styles.cancelButton}
              onClick={handleCancelBtnClick}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;
