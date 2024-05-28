import React from "react";
import styles from "./QuizAnalysis.module.css";

const QuizAnalysis = ({ questions }) => {
  return (
    <div className={styles.analysisContainer}>
      <h1>Quiz Question Analysis</h1>
      {questions.map((question, index) => (
        <div key={index} className={styles.questionBlock}>
          <h2>{`Q${index + 1}. ${question.question}`}</h2>
          <div className={styles.stats}>
            <div className={styles.statBox}>
              <span>{question.impressions}</span>
              <p>Impressions</p>
            </div>
            <div className={styles.statBox}>
              <span>
                {question.options
                  .filter((option) => option.isCorrect)
                  .reduce((acc, option) => acc + option.selectionCount, 0)}
              </span>
              <p>Answered Correctly</p>
            </div>
            <div className={styles.statBox}>
              <span>
                {question.options
                  .filter((option) => !option.isCorrect)
                  .reduce((acc, option) => acc + option.selectionCount, 0)}
              </span>
              <p>Answered Incorrectly</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizAnalysis;
