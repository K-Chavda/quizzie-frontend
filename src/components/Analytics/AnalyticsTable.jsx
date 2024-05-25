import React from "react";
import styles from "./AnalyticsTable.module.css";
import FormatDate from "../../utils/FormatDate";
import { FaRegEdit, FaTrashAlt, FaShareAlt } from "react-icons/fa";

const AnalyticsTable = ({ activityData, deleteActivity }) => {
  const handleDeleteClick = (acttivityId) => {
    deleteActivity(acttivityId);
  };
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.heading}>Quiz Analysis</div>
      <div className={styles.tableWrapper}>
        <div className={`${styles.row} ${styles.header}`}>
          <div className={styles.cell}>S.No</div>
          <div className={styles.cell}>Quiz Name</div>
          <div className={styles.cell}>Created on</div>
          <div className={styles.cell}>Impression</div>
          <div className={styles.cell}></div>
          <div className={styles.cell}></div>
        </div>
        <div className={styles.tableContainer}>
          {activityData.map((quiz, index) => (
            <div
              key={index}
              className={`${styles.row} ${
                index % 2 === 0 ? styles.evenRow : styles.oddRow
              }`}
            >
              <div className={styles.cell}>{index + 1}</div>
              <div className={styles.cell}>{quiz.title}</div>
              <div className={styles.cell}>{FormatDate(quiz.createdAt)}</div>
              <div className={`${styles.cell} ${styles.tdNumber}`}>
                {quiz.impressions}
              </div>
              <div className={styles.cell}>
                <FaRegEdit className={styles.icon} />
                <FaTrashAlt
                  className={styles.icon}
                  onClick={() => {
                    handleDeleteClick(quiz._id);
                  }}
                />
                <FaShareAlt className={styles.icon} />
              </div>
              <div className={styles.cell}>
                <a href="#" className={styles.analysisLink}>
                  Question Wise Analysis
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTable;
