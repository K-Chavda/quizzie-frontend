import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { showToast } from "../../components/Toast/Toast";
import axios from "axios";
import BASE_URL from "../../utils/Constants";
import FormatDate from "../../utils/FormatDate";
import { groupIcon } from "../../assets/icons";

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalImpressions: "0",
    totalQuestions: 0,
    totalQuizzesAndPolls: 0,
  });

  const [trending, setTrending] = useState({ trendingQuiz: [] });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    axios.defaults.headers.common["Authorization"] = token;

    const fetchData = async () => {
      try {
        const [analyticsResponse, trendingResponse] = await Promise.all([
          axios.post(`${BASE_URL}/activity/analytics`, { userId }),
          axios.post(`${BASE_URL}/activity/trending`, { userId }),
        ]);

        const { totalImpressions, totalQuestions, totalQuizzesAndPolls } =
          analyticsResponse.data.data;
        setAnalytics({
          totalImpressions,
          totalQuestions,
          totalQuizzesAndPolls,
        });

        setTrending(trendingResponse.data.data);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Something Went Wrong!";
        showToast(errorMessage, "error");
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <Navbar />
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardCards}>
          <div className={styles.card}>
            <span className={styles.spanText}>
              <span className={styles.spanCount}>
                {analytics.totalQuizzesAndPolls}
              </span>{" "}
              Quiz Created
            </span>
          </div>
          <div className={styles.card}>
            <span className={styles.spanText}>
              <span className={styles.spanCount}>
                {analytics.totalQuestions}
              </span>{" "}
              Questions Created
            </span>
          </div>
          <div className={styles.card}>
            <span className={styles.spanText}>
              <span className={styles.spanCount}>
                {analytics.totalImpressions}
              </span>{" "}
              Total Impressions
            </span>
          </div>
        </div>
        <div className={styles.trendingActivityContainer}>
          <div className={styles.trendingText}>Trending Quizzes</div>
          <div className={styles.trendingCardContainer}>
            {trending.trendingQuiz.map(
              ({ _id, title, impressions, createdAt }) => (
                <div className={styles.trendingCard} key={_id}>
                  <div className={styles.cardContent}>
                    <div className={styles.activityName}>{title}</div>
                    <div className={styles.activityImpression}>
                      <span className={styles.impressionCount}>
                        {impressions}
                      </span>
                      <span className={styles.impressionIcon}>
                        <img src={groupIcon} alt="Group.svg" />
                      </span>
                    </div>
                  </div>
                  <div className={styles.cardCreationDate}>
                    <span className={styles.creationDate}>
                      Created on: {FormatDate(createdAt)}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
