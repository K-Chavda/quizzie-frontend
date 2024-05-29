import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./QuizPoll.module.css";
import trophyImage from "../../assets/images/Trophy.png";
import {
  IncreaseImpressionCount,
  GetQuizData,
  IncreaseAnswerCount,
  IncreaseOptionImpression,
} from "../../api/activity";

function QuizPoll() {
  const { id } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const increaseQuestionImpression = async () => {
      await IncreaseImpressionCount(
        id,
        quizData.questions[questionIndex]._id
      ).then((respose) => {});
    };

    if (quizData && quizData.questions.length > 0) {
      increaseQuestionImpression();
    }
  }, [id, quizData, questionIndex]); // Updated dependency array

  useEffect(() => {
    const fetchQuizData = async () => {
      GetQuizData(id).then((data) => {
        setQuizData(data);
        setQuestionIndex(0);
      });
    };

    fetchQuizData();
  }, [id]);

  useEffect(() => {
    if (quizData && questionIndex < quizData.questions.length) {
      const questionTimer = quizData.questions[questionIndex].timer;
      setTimer(questionTimer);
    }
  }, [quizData, questionIndex]);

  useEffect(() => {
    if (timer > 0 && !showResult) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            if (questionIndex + 1 === quizData.questions.length) {
              setShowResult(true);
            } else {
              setQuestionIndex((prevIndex) => prevIndex + 1);
              setUserAnswers({});
              const nextQuestionTimer =
                quizData.questions[questionIndex + 1].timer;
              setTimer(nextQuestionTimer);
            }
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [timer, questionIndex, quizData, showResult]);

  const handleAnswerChange = async (optionIndex) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: optionIndex,
    });

    await IncreaseOptionImpression(
      id,
      quizData.questions[questionIndex]._id,
      quizData.questions[questionIndex].options[optionIndex]._id
    );

    const correctOptionIndex = quizData.questions[
      questionIndex
    ].options.findIndex((option) => option.isCorrect);

    if (optionIndex === correctOptionIndex) {
      IncreaseAnswerCount(id, quizData.questions[questionIndex]._id, "correct");
      setScore((prevScore) => prevScore + 1);
    } else {
      IncreaseAnswerCount(id, quizData.questions[questionIndex]._id, "wrong");
    }
  };

  const handleSubmit = () => {
    if (questionIndex + 1 === quizData.questions.length) {
      setShowResult(true);
    } else {
      setQuestionIndex((prevIndex) => prevIndex + 1);
      setUserAnswers({});
    }
  };

  if (!quizData) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quizData.questions[questionIndex];

  return (
    <div className={styles.mainContainer}>
      <div className={styles.quizContainer}>
        {!showResult ? (
          <>
            <div className={styles.modelHeader}>
              <span className={styles.questionNumber}>
                0{questionIndex + 1}/0{quizData.questions.length}
              </span>
              {quizData &&
              quizData.activityType === "QA" &&
              quizData.timer !== 0 ? (
                <span className={styles.questionTimer}>
                  00 : {timer > 9 ? timer : `0${timer ? timer : 0}`}s
                </span>
              ) : null}
            </div>
            <div className={styles.questionContainer}>
              <div className={styles.question}>
                <span>{currentQuestion.question}</span>
              </div>
              <div className={styles.questionOptions}>
                {currentQuestion.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={
                      userAnswers[questionIndex] === optionIndex
                        ? currentQuestion.optionType === "image"
                          ? `${styles.optionCard} ${styles.selected} ${styles.imageCard}`
                          : `${styles.optionCard} ${styles.selected}`
                        : currentQuestion.optionType === "image"
                        ? `${styles.optionCard} ${styles.imageCard}`
                        : styles.optionCard
                    }
                  >
                    {currentQuestion.optionType === "text" ||
                    currentQuestion.optionType === "text_image" ? (
                      <>
                        <input
                          type="radio"
                          id={`option_${optionIndex}`}
                          name="options"
                          value={optionIndex}
                          checked={userAnswers[questionIndex] === optionIndex}
                          onChange={() => handleAnswerChange(optionIndex)}
                        />
                        <label
                          className={
                            currentQuestion.optionType === "text_image"
                              ? styles.left
                              : null
                          }
                          htmlFor={`option_${optionIndex}`}
                        >
                          {option.text}
                        </label>
                      </>
                    ) : null}
                    {currentQuestion.optionType === "image" ||
                    currentQuestion.optionType === "text_image" ? (
                      <img
                        src={option.imageUrl}
                        alt=""
                        onClick={() => handleAnswerChange(optionIndex)}
                      />
                    ) : null}
                  </div>
                ))}
                <div className={styles.modelFooter}>
                  <button onClick={handleSubmit}>
                    {questionIndex === quizData.questions.length - 1
                      ? "SUBMIT"
                      : "NEXT"}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.quizResult}>
            <span className={styles.spanText}>
              {quizData.activityType === "QA"
                ? "Congrats Quiz is completed"
                : "Thank you for participating in the Poll"}
            </span>
            {quizData.activityType === "QA" ? (
              <>
                <div className={styles.imageContainer}>
                  <img src={trophyImage} alt="trophyImage" />
                </div>
                <div className={styles.spanText}>
                  <div className={styles.scoreText}>Your Score is</div>
                  <div className={styles.scoreSpan}>
                    {score > 9 || score === 0 ? score : `0${score}`}/
                    {quizData.questions.length > 9 ||
                    quizData.questions.length === 0
                      ? quizData.questions.length
                      : `0${quizData.questions.length}`}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizPoll;
