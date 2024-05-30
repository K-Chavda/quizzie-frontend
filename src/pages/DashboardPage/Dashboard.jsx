import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import Navbar from "../../components/Navbar/Navbar";
import FormatDate from "../../utils/FormatDate";
import { groupIcon } from "../../assets/icons";
import { GetAnalytics, GetTrendingQuiz } from "../../api/activity";
import { promiseToast } from "../../components/Toast/Toast";

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalImpressions: "0",
    totalQuestions: 0,
    totalQuizzesAndPolls: 0,
  });

  const [trending, setTrending] = useState({ trendingQuiz: [] });

  useEffect(() => {
    const fetchData = async () => {
      const getAnalyticsPromise = GetAnalytics()
        .then((response) => {
          const { totalImpressions, totalQuestions, totalQuizzesAndPolls } =
            response;

          setAnalytics({
            totalImpressions,
            totalQuestions,
            totalQuizzesAndPolls,
          });

          return response;
        })
        .catch((error) => {
          throw error;
        });

      promiseToast(getAnalyticsPromise, {
        pending: "Loading analytics data...",
      });

      const getTrendingQuizPromise = GetTrendingQuiz()
        .then((response) => {
          const { trendingQuiz } = response;
          setTrending({ trendingQuiz });

          return response;
        })
        .catch((error) => {
          throw error;
        });

      promiseToast(getTrendingQuizPromise, {
        pending: "Loading trending quizzes...",
      });
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
              ({ _id, title, totalImpressions, createdAt }) => (
                <div className={styles.trendingCard} key={_id}>
                  <div className={styles.cardContent}>
                    <div className={styles.activityName}>{title}</div>
                    <div className={styles.activityImpression}>
                      <span className={styles.impressionCount}>
                        {totalImpressions}
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
