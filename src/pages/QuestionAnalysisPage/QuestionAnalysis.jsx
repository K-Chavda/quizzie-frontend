import React, { useEffect, useState } from "react";
import styles from "./QuestionAnalysis.module.css";
import Navbar from "../../components/Navbar/Navbar";
import QuizAnalysis from "./QuizAnalysisPage/QuizAnalysis";
import PollAnalysis from "./PollAnalysisPage/PollAnalysis";
import FormatDate from "../../utils/FormatDate";
import { useLocation } from "react-router-dom";
import { GetQuestionAnalytics, GetActivity } from "../../api/activity";

const QuestionAnalysis = ({ data }) => {
  const location = useLocation();
  const [activityId, setActivityId] = useState("");
  const [questionData, setQuestionData] = useState({});
  const [impression, setImpression] = useState(0);

  useEffect(() => {
    if (location.state) {
      setActivityId(location.state.activityId);
    }
  }, []);

  const fetchData = async () => {
    await GetQuestionAnalytics(activityId)
      .then((response) => {
        const { activityAnalytics } = response.data;
        setQuestionData(activityAnalytics);
      })
      .catch((error) => {});

    await GetActivity()
      .then((response) => {
        const activity = response.filter(
          (activity) => activity._id === activityId
        );

        setImpression(activity[0].impressions);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    fetchData();
  }, [activityId]);

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
          {questionData.activityType === "QA" ? (
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
