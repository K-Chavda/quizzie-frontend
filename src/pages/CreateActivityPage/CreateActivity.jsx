import React, { useEffect, useState } from "react";
import styles from "./CreateActivity.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { showToast } from "../../components/Toast/Toast";

function CreateActivity() {
  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = useState({
    quizName: location.state ? location.state.quizName : "",
    quizType: location.state ? location.state.quizType : "",
  });

  const [error, setError] = useState({
    quizName: "",
    quizType: "",
  });

  const handleChangeEvent = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });

    setError((prevError) => ({
      ...prevError,
      quizName: "",
      quizType: "",
    }));
  };

  const handleContinueBtnClick = () => {
    const { quizName, quizType } = value;

    if (!quizName) {
      setError((prevError) => ({
        ...prevError,
        quizName: "Please enter quiz name",
      }));
    }

    if (!quizType) {
      setError((prevError) => ({
        ...prevError,
        quizType: "Please select quiz type",
      }));
    }

    if (quizName && quizType) {
      navigate("/createQuestions", {
        state: { quizName: quizName, quizType: quizType },
      });
    }
  };

  const handleCancelBtnClick = () => {
    navigate("/Dashboard");
  };

  useEffect(() => {
    if (error.quizType) {
      showToast(error.quizType, "error");
    }
  }, [error, setError]);

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
                className={error.quizName ? styles.errorText : ""}
                placeholder={error.quizName ? error.quizName : `Quiz name`}
                value={value.quizName}
                onChange={handleChangeEvent}
              />
            </div>
            <div className={styles.quizTypeInput}>
              <label>Quiz Type</label>
              <input
                type="radio"
                name="quizType"
                id="QA"
                value="QA"
                checked={value.quizType === "QA"}
                onChange={handleChangeEvent}
              />
              <label htmlFor="QA">Q&A</label>
              <input
                type="radio"
                name="quizType"
                id="POLL"
                value="Poll"
                checked={value.quizType === "Poll"}
                onChange={handleChangeEvent}
              />
              <label htmlFor="POLL">Poll</label>
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
}

export default CreateActivity;
