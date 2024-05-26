import styles from "./CreateQuestions.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { plusIcon, closeIcon, deleteIcon } from "../../assets/icons/index";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";

function CreateQuestions() {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizName, quizType } = location.state;

  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [quizOptions, setQuizOptions] = useState([
    {
      id: uuidv4(),
      type: "",
      text: "",
      imageUrl: "",
      isCorrect: false,
    },
  ]);

  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      question: "",
      optionType: "text_image",
      questionTimer: "",
      options: quizOptions,
    },
  ]);

  const handleAddQuestionBtnClick = () => {
    const id = uuidv4();
    if (questions.length <= 4) {
      setQuestions([
        ...questions,
        {
          id: id,
          question: "",
          optionType: "",
        },
      ]);
    }

    setSelectedQuestion(id);
  };

  const handleRemoveBtnClick = async (id) => {
    setQuestions(await questions.filter((question) => question.id !== id));
  };

  const handleCancelBtnClick = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    setSelectedQuestion(questions[questions.length - 1].id);
  }, [questions, setQuestions]);

  return (
    <div className={styles.mainContainer}>
      <Navbar />
      <div className={styles.modelContainer}>
        <div className={styles.modelContent}>
          <div className={styles.questionInputContainer}>
            <div className={styles.questionNumberContainer}>
              <div className={styles.questionNumberAndAddContainer}>
                {questions.length > 0 &&
                  questions.map((question, index) => (
                    <div className={styles.questionNumber} key={question.id}>
                      <span className={styles.questionNumberSpan}>
                        {index + 1}
                      </span>
                      {index > 0 ? (
                        <span
                          className={styles.questionNumberSpanIcon}
                          onClick={() => {
                            handleRemoveBtnClick(question.id);
                          }}
                        >
                          <img src={closeIcon} alt="closeIcon" />
                        </span>
                      ) : null}
                    </div>
                  ))}
                {questions.length < 5 ? (
                  <span
                    className={styles.questionAddIcon}
                    onClick={handleAddQuestionBtnClick}
                  >
                    <img src={plusIcon} alt="plusIcon" />
                  </span>
                ) : null}
              </div>
              <div className={styles.maxQuestionsSpan}>
                <span>Max 5 questions</span>
              </div>
            </div>
            <div className={styles.questionInputField}>
              <input
                type="text"
                name="question"
                id="question"
                placeholder={`${quizType} Question`}
              />
            </div>
            <div className={styles.questionOptionType}>
              <div className={styles.optionType}>
                <label className={styles.label}>Option Type</label>
                <input type="radio" name="optionType" id="text" />
                <label htmlFor="text">Text</label>
                <input type="radio" name="optionType" id="image" />
                <label htmlFor="image">Image URL</label>
                <input type="radio" name="optionType" id="text_image" />
                <label htmlFor="text_image">Text & Image URL</label>
              </div>
            </div>
          </div>
          <div className={styles.questionOptionsTimer}>
            <div className={styles.questionOptions}>
              {quizOptions.map((option, index) => {
                return (
                  <div className={styles.otionsContainer} key={option.id}>
                    <div className={styles.answerSelector}>
                      {quizType === "QA" ? (
                        <input
                          type="radio"
                          name="correctAnswer"
                          id="correctAnswer"
                        />
                      ) : null}
                    </div>
                    {questions[0].optionType === "text" ||
                    questions[0].optionType === "text_image" ? (
                      <div
                        className={`${styles.optionTextInput}`}
                        style={
                          questions[0].optionType === "text"
                            ? { width: "50%" }
                            : null
                        }
                      >
                        <input type="text" name="option" placeholder="Text" />
                      </div>
                    ) : null}
                    {questions[0].optionType === "text_image" ||
                    questions[0].optionType === "image" ? (
                      <>
                        <div className={`${styles.imageUrlInput}`}>
                          <input
                            type="text"
                            name="imageUrl"
                            placeholder="Image URL"
                          />
                        </div>
                        {questions[0].optionType === "image" ? (
                          <div className={`${styles.optionTextInput}`}></div>
                        ) : null}
                      </>
                    ) : null}
                    <div className={styles.deleteOptionIcon}>
                      {quizOptions.length > 2 ? (
                        <img src={deleteIcon} alt="closeIcon" />
                      ) : null}
                    </div>
                  </div>
                );
              })}
              {quizOptions.length < 4 ? (
                <div className={styles.optionAddButton}>
                  <button className={styles.addOption}>Add Option</button>
                </div>
              ) : null}
            </div>
            <div className={styles.questionTimer}>
              {quizType === "QA" ? (
                <>
                  <label>Timer</label>
                  <input type="radio" name="Timer" id="OFF" />
                  <label htmlFor="OFF">OFF</label>
                  <input type="radio" name="Timer" id="FiveSec" />
                  <label htmlFor="FiveSec">5 Sec</label>
                  <input type="radio" name="Timer" id="TenSec" />
                  <label htmlFor="TenSec">10 Sec</label>
                </>
              ) : null}
            </div>
          </div>
          <div className={styles.modelFooter}>
            <button
              className={styles.cancelButton}
              onClick={handleCancelBtnClick}
            >
              Cancel
            </button>
            <button className={styles.continueButton}>Create Quiz</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateQuestions;
