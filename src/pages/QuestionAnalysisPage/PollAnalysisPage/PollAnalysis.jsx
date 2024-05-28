import React from "react";
import styles from "./PollAnalysis.module.css";

const PollAnalysis = ({ questions }) => {
  return (
    <div className={styles.analysisContainer}>
      <h1>Quiz Question Analysis</h1>
      {questions.map((question, index) => (
        <div key={index} className={styles.questionBlock}>
          <h2>{`Q${index + 1}. ${question.question}`}</h2>
          <div className={styles.stats}>
            {question.options.map((option, optIndex) => (
              <div key={optIndex} className={styles.statBox}>
                <span>{option.selectionCount}</span>
                <p>{`Option ${optIndex + 1}`}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PollAnalysis;
