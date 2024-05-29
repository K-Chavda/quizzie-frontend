import React from "react";
import styles from "./PollAnalysis.module.css";
import { v4 as uuidv4 } from "uuid";

function PollAnalysis({ questionData }) {
  return (
    <>
      <div className={styles.mainContainer}>
        {questionData.questions &&
          questionData.questions.map((question, index) => (
            <div
              className={
                question.optionType === "text_image"
                  ? `${styles.questionImageTextContainer}`
                  : `${styles.questionContainer}`
              }
              key={`${uuidv4()}`}
            >
              <div className={styles.question}>
                <span className={styles.questionNumber}>Q.{index + 1}</span>
                <span className={styles.questionText}>{question.question}</span>
              </div>
              {question.optionType === "text" && (
                <div className={styles.optionsCardContainer}>
                  {question.options.map((option, optionIndex) => (
                    <div className={styles.optionsCard} key={uuidv4()}>
                      <span className={styles.selectionCountSpan}>
                        {option.selectionCount}
                      </span>
                      <span className={styles.textSpan}>{option.text}</span>
                    </div>
                  ))}
                </div>
              )}
              {question.optionType === "image" && (
                <div className={styles.optionsCardContainer}>
                  {question.options.map((option, optionIndex) => (
                    <div className={styles.optionsCard} key={uuidv4()}>
                      <span className={styles.selectionCountSpan}>
                        {option.selectionCount}
                      </span>
                      <img
                        className={styles.optionImg}
                        src={option.imageUrl}
                        alt="imageUrl"
                      />
                    </div>
                  ))}
                </div>
              )}
              {question.optionType === "text_image" && (
                <div className={styles.optionsImageTextCardContainer}>
                  {question.options.map((option, optionIndex) => (
                    <div className={styles.optionsImageTextCard} key={uuidv4()}>
                      <span className={styles.selectionCountSpan}>
                        {option.selectionCount}
                      </span>
                      <div className={styles.optionTextImg}>
                        <span className={styles.textImageTextSpan}>
                          {option.text}
                        </span>
                        <img
                          className={styles.optionImageTextImg}
                          src={option.imageUrl}
                          alt="imageUrl"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
}

export default PollAnalysis;
