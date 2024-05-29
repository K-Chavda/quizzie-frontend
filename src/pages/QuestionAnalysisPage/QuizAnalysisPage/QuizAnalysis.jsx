import React from "react";
import styles from "./QuizAnalysis.module.css";
import { v4 as uuidv4 } from "uuid";

function QuizAnalysis({ questionData }) {
  console.log(questionData);
  return (
    <>
      <div className={styles.mainContainer}>
        {questionData.questions &&
          questionData.questions.map((question, index) => (
            <div className={styles.questionContainer} key={uuidv4()}>
              <div className={styles.question}>
                <span className={styles.questionNumber}>Q.{index + 1}</span>
                <span className={styles.questionText}>{question.question}</span>
              </div>
              <div className={styles.analyticsCardContainer}>
                <div className={styles.analyticsCard}>
                  <span className={styles.selectionCountSpan}>
                    {question.totalAttempts}
                  </span>
                  <span className={styles.textSpan}>
                    people Attempted the question
                  </span>
                </div>
                <div className={styles.analyticsCard}>
                  <span className={styles.selectionCountSpan}>
                    {question.correctAnswers}
                  </span>
                  <span className={styles.textSpan}>
                    people Answered Correctly
                  </span>
                </div>
                <div className={styles.analyticsCard}>
                  <span className={styles.selectionCountSpan}>
                    {question.wrongAnswers}
                  </span>
                  <span className={styles.textSpan}>
                    people Answered Incorrectly
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default QuizAnalysis;
