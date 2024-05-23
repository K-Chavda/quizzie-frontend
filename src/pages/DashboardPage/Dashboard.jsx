import React from "react";
import styles from "./Dashboard.module.css";
import Navbar from "../../components/Navbar/Navbar";

import { groupIcon } from "../../assets/icons";

function Dashboard() {
  return (
    <>
      <div className={styles.mainContainer}>
        <Navbar />
        <div className={styles.dashboardContainer}>
          <div className={styles.dashboardCards}>
            <div className={styles.card}>
              <span className={styles.spanText}>
                <span className={styles.spanCount}>12</span> Quiz Created
              </span>
            </div>
            <div className={styles.card}>
              <span className={styles.spanText}>
                <span className={styles.spanCount}>110</span> Questions Created
              </span>
            </div>
            <div className={styles.card}>
              <span className={styles.spanText}>
                <span className={styles.spanCount}>989</span> Total Impressions
              </span>
            </div>
          </div>
          <div className={styles.trendingActivityContainer}>
            <div className={styles.trendingText}>Trending Quizs</div>
            <div className={styles.trendingCard}>
              <div className={styles.cardContent}>
                <div className={styles.activityName}>Quiz 1</div>
                <div className={styles.activityImpression}>
                  <span className={styles.impressionCount}>667</span>
                  <span className={styles.impressionIcon}>
                    <img src={groupIcon} alt="Group.svg" />
                  </span>
                </div>
              </div>
              <div className={styles.cardCreationDate}>
                <span className={styles.creationDate}>
                  Created on : 04 Sep, 2023
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
