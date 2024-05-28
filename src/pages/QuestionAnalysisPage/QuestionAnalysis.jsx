import React, { useEffect, useState } from "react";
import QuizAnalysis from "./QuizAnalysisPage/QuizAnalysis";
import PollAnalysis from "./PollAnalysisPage/PollAnalysis";
import { useLocation, useParams } from "react-router-dom";
import BASE_URL from "../../utils/Constants";
import axios from "axios";
import styles from "./QuestionAnalysis.module.css";
import Navbar from "../../components/Navbar/Navbar";
import FormatDate from "../../utils/FormatDate";

const QuestionAnalysis = ({ data }) => {
  const location = useLocation();
  const [activityId, setActivityId] = useState("");
  const [questionData, setQuestionData] = useState({});
  const [impression, setImpression] = useState(
    (location.state && location.state.impression) || 0
  );

  useEffect(() => {
    if (location.state) {
      setActivityId(location.state.activityId);
    }
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;

    try {
      if (!activityId) {
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/activity/analytics/${activityId}`
      );

      if (response && response.data && response.data.success) {
        setQuestionData(response.data.data.activityAnalytics);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activityId]);

  // console.log(questionData);

  return (
    <div className={styles.mainContainer}>
      <Navbar />
      <div className={styles.analyticsContainer}>
        <div className={styles.quizDetailsContainer}>
          <div className={styles.quizHeadingContainer}>
            <span className={styles.quizHeading}>
              {questionData.title} Question Analysis
            </span>
          </div>
          <div className={styles.quizAnalyticContainer}>
            <span className={styles.createdDateSpan}>
              Created On :{" "}
              {FormatDate(
                questionData.createdAt ? questionData.createdAt : new Date()
              )}
            </span>
            <span className={styles.impressionsSpan}>
              Impressions : {impression}
            </span>
          </div>
        </div>
        <div className={styles.quizComponentContainer}>
          {questionData.activityType !== "QA" ? (
            <QuizAnalysis questionData={questionData} />
          ) : (
            <PollAnalysis questionData={questionData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionAnalysis;
