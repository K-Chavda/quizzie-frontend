import React, { useEffect, useState } from "react";
import styles from "./CreateActivity.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { showToast } from "../../components/Toast/Toast";
import { GetSingleActivity } from "../../api/activity";

const CreateActivity = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [quizName, setQuizName] = useState(location.state?.quizName || "");
  const [quizType, setQuizType] = useState(location.state?.quizType || "");
  const activityId = location.state?.activityId || "";
  const [error, setError] = useState({ quizName: "", quizType: "" });

  useEffect(() => {
    if (activityId) {
      fetchActivityDetails(activityId);
    }
  }, [activityId]);

  const fetchActivityDetails = async (activityId) => {
    try {
      const response = await GetSingleActivity(activityId);
      setQuizName(response.title);
      setQuizType(response.activityType);
    } catch (error) {
      console.error("Error fetching activity details:", error);
      showToast("Failed to fetch activity details", "error");
    }
  };

  const handleChangeEvent = (e) => {
    const { name, value } = e.target;
    if (name === "quizName") {
      setQuizName(value);
      setError({ ...error, quizName: "" });
    } else if (name === "quizType") {
      setQuizType(value);
      setError({ ...error, quizType: "" });
    }
  };

  const handleContinueBtnClick = () => {
    if (!quizName) {
      setError({ ...error, quizName: "Please enter quiz name" });
    }
    if (!quizType) {
      setError({ ...error, quizType: "Please select quiz type" });
    }
    if (quizName && quizType) {
      localStorage.removeItem("questions");
      navigate("/createQuestions", {
        state: { quizName, quizType, activityId },
      });
    }
  };

  const handleCancelBtnClick = () => {
    navigate("/Dashboard");
  };

  useEffect(() => {
    if (error.quizType || error.quizName) {
      showToast(error.quizType || error.quizName, "error");
    }
  }, [error]);

  return (
    <div className={styles.mainContainer}>
      <Navbar />
      <div className={styles.modelContainer}>
        <div className={styles.modelContent}>
          <div className={styles.inputFieldsContainer}>
            <div className={styles.quizNameInput}>
              <input
                type="text"
                name="quizName"
                id="quizName"
                className={error.quizName && styles.errorText}
                placeholder={error.quizName || "Quiz name"}
                value={quizName}
                onChange={handleChangeEvent}
              />
              {error.quizName && (
                <p className={styles.error}>{error.quizName}</p>
              )}
            </div>
            <div className={styles.quizTypeInput}>
              <label>Quiz Type</label>
              <input
                type="radio"
                name="quizType"
                id="QA"
                value="QA"
                checked={quizType === "QA"}
                onChange={handleChangeEvent}
              />
              <label htmlFor="QA">Q&A</label>
              <input
                type="radio"
                name="quizType"
                id="POLL"
                value="Poll"
                checked={quizType === "Poll"}
                onChange={handleChangeEvent}
              />
              <label htmlFor="POLL">Poll</label>
              {error.quizType && (
                <p className={styles.error}>{error.quizType}</p>
              )}
            </div>
          </div>
          <div className={styles.modelFooterContainer}>
            <button
              className={styles.cancelButton}
              onClick={handleCancelBtnClick}
            >
              Cancel
            </button>
            <button
              className={styles.continueButton}
              onClick={handleContinueBtnClick}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateActivity;
