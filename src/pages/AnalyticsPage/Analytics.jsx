import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import AnalyticsTable from "../../components/Analytics/AnalyticsTable";
import { Outlet, useLocation } from "react-router-dom";
import { GetActivity, DeleteActivity } from "../../api/activity";

import styles from "./Analytics.module.css";
import { showToast, promiseToast } from "../../components/Toast/Toast";

function Analytics() {
  const location = useLocation();
  const isNested = location.pathname.includes("/analytics/questionAnalysis");

  const [activityId, setActivitiesId] = useState("");
  const [activitiesData, setActivitiesData] = useState([]);
  const [modelVisibility, setModelVisibility] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const getActivityPromise = GetActivity()
      .then((activity) => {
        setActivitiesData(activity);
        return activity;
      })
      .catch((error) => {});

    promiseToast(getActivityPromise, {
      pending: "Loading activities...",
    });
  };

  const deleteActivity = async () => {
    await DeleteActivity(activityId).then((response) => {
      if (response.success) {
        showToast(response.message, "success");
        setModelVisibility(!modelVisibility);
      }
    });
    fetchData();
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
      {!isNested ? (
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
          <div
            className={modelVisibility ? styles.modelContainer : styles.close}
          >
            <div className={styles.modelContent}>
              <div className={styles.message}>
                Are you confirm you want to delete ?
              </div>
              <div className={styles.footerContainer}>
                <button
                  className={styles.deleteButton}
                  onClick={deleteActivity}
                >
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
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default Analytics;
