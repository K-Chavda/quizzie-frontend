import React, { useEffect, useState } from "react";
import QuizAnalysis from "./QuizAnalysisPage/QuizAnalysis";
import PollAnalysis from "./PollAnalysisPage/PollAnalysis";
import { useLocation, useParams } from "react-router-dom";
import BASE_URL from "../../utils/Constants";

const QuizAnalysis = ({ data }) => {
  const location = useLocation();
  const [activityId, setActivityId] = useState("");
  const [questionData, setQuestionData] = useState({});

  useEffect(() => {
    setActivityId(location.state.activityId);
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/activity/analytics/${activityId}`
      );
      if (response && response.data && response.data.success) {
        setQuestionData(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();

  return (
    <div>
      {activityType === "QA" ? (
        <QuizAnalysis questions={questions} />
      ) : (
        <PollAnalysis questions={questions} />
      )}
    </div>
  );
};

export default QuizAnalysis;
