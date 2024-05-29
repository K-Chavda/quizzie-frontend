import styles from "./CreateQuestions.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { plusIcon, closeIcon, deleteIcon } from "../../assets/icons/index";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
import { showToast } from "../../components/Toast/Toast";
import { GetQuestionData, CreateOrModifyActivity } from "../../api/activity";

function CreateQuestions() {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizName, quizType } = location.state;

  const activityId = location.state.activityId || "";
  const [selectedQuestion, setSelectedQuestion] = useState("");

  const [questions, setQuestions] = useState(() => {
    const storedQuestions = localStorage.getItem("questions");
    return storedQuestions
      ? JSON.parse(storedQuestions)
      : [
          {
            id: uuidv4(),
            question: "",
            optionType: "text",
            timer: 0,
            options: [
              {
                id: uuidv4(),
                type: "",
                text: "",
                imageUrl: "",
                isCorrect: false,
              },
              {
                id: uuidv4(),
                type: "",
                text: "",
                imageUrl: "",
                isCorrect: false,
              },
            ],
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  const handleAddQuestionBtnClick = () => {
    const id = uuidv4();
    if (questions.length <= 4) {
      setQuestions([
        ...questions,
        {
          id: id,
          question: "",
          optionType: "text",
          timer: 0,
          options: [
            {
              id: uuidv4(),
              type: "",
              text: "",
              imageUrl: "",
              isCorrect: false,
            },
            {
              id: uuidv4(),
              type: "",
              text: "",
              imageUrl: "",
              isCorrect: false,
            },
          ],
        },
      ]);
    }

    setSelectedQuestion(id);
  };

  const handleRemoveBtnClick = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  const handleOptionTypeChange = (e) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === selectedQuestion) {
        question.optionType = e.target.id;
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleTimerChange = (timerValue) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === selectedQuestion) {
        question.timer = timerValue;
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleCancelBtnClick = () => {
    navigate("/dashboard");
  };

  const handleQuestionNumberClick = (id) => {
    setSelectedQuestion(id);
  };

  useEffect(() => {
    if (activityId) {
      const fetchData = async () => {
        GetQuestionData(activityId).then((activityData) => {
          const updatedQuestions = activityData.questions.map((question) => ({
            ...question,
            id: question._id,
            options: question.options.map((option) => ({
              ...option,
              id: option._id,
            })),
          }));
          setQuestions(updatedQuestions);
        });
      };
      fetchData();
    }
  }, [activityId]);

  const handleCreateQuizBtnClick = async () => {
    const isQuestion = questions.every((question) => question.question);

    if (!isQuestion) {
      showToast("Please provide question for activity", "error");
      return;
    }

    const areOptionsFilled = questions.every((question) =>
      question.options.every((option) => option.text || option.imageUrl)
    );

    if (!areOptionsFilled) {
      showToast("Please provide option value", "error");
      return;
    }

    if (quizType === "QA") {
      const isCorrectAnswerSelected = questions.every((question) => {
        return question.options.some((option) => option.isCorrect);
      });

      if (!isCorrectAnswerSelected) {
        showToast("Please select at least one correct answer", "error");
        return;
      }
    }

    CreateOrModifyActivity({
      activityId,
      quizName,
      quizType,
      questions,
    }).then((activity) => {
      showToast(activity.message, "success");
      navigate("/dashboard");
    });
  };

  useEffect(() => {
    setSelectedQuestion(questions[questions.length - 1].id);
  }, []);

  const selected = questions.filter(
    (question) => question.id === selectedQuestion
  );

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
                    <div
                      className={styles.questionNumber}
                      key={question.id}
                      onClick={() => {
                        handleQuestionNumberClick(question.id);
                      }}
                    >
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
                value={selected.length > 0 ? selected[0].question : ""}
                onChange={(e) => {
                  const updatedQuestions = questions.map((question) => {
                    if (question.id === selectedQuestion) {
                      question.question = e.target.value;
                    }
                    return question;
                  });
                  setQuestions(updatedQuestions);
                }}
              />
            </div>
            <div className={styles.questionOptionType}>
              <div className={styles.optionType}>
                <label className={styles.label}>Option Type</label>
                <input
                  type="radio"
                  name="optionType"
                  id="text"
                  onChange={handleOptionTypeChange}
                  checked={
                    selected.length > 0
                      ? selected[0].optionType === "text"
                      : false
                  }
                />
                <label htmlFor="text">Text</label>
                <input
                  type="radio"
                  name="optionType"
                  id="image"
                  onChange={handleOptionTypeChange}
                  checked={
                    selected.length > 0
                      ? selected[0].optionType === "image"
                      : false
                  }
                />
                <label htmlFor="image">Image URL</label>
                <input
                  type="radio"
                  name="optionType"
                  id="text_image"
                  onChange={handleOptionTypeChange}
                  checked={
                    selected.length > 0
                      ? selected[0].optionType === "text_image"
                      : false
                  }
                />
                <label htmlFor="text_image">Text & Image URL</label>
              </div>
            </div>
          </div>
          <div className={styles.questionOptionsTimer}>
            <div className={styles.questionOptions}>
              {selected.length > 0 &&
                selected[0].options.map((option, index) => (
                  <div className={styles.otionsContainer} key={option.id}>
                    <div className={styles.answerSelector}>
                      {quizType === "QA" ? (
                        <input
                          type="radio"
                          name={`correctAnswer-${selectedQuestion}`}
                          id={`correctAnswer-${option.id}`}
                          checked={option.isCorrect}
                          onChange={() => {
                            const updatedQuestions = questions.map(
                              (question) => {
                                if (question.id === selectedQuestion) {
                                  question.options = question.options.map(
                                    (opt) => {
                                      if (opt.id === option.id) {
                                        opt.isCorrect = true;
                                      } else {
                                        opt.isCorrect = false;
                                      }
                                      return opt;
                                    }
                                  );
                                }
                                return question;
                              }
                            );
                            setQuestions(updatedQuestions);
                          }}
                        />
                      ) : null}
                    </div>
                    {(selected[0].optionType === "text" ||
                      selected[0].optionType === "text_image") && (
                      <div
                        className={`${styles.optionTextInput} ${
                          option.isCorrect ? styles.selected : ""
                        }`}
                        style={
                          selected[0].optionType === "text"
                            ? { width: "50%" }
                            : null
                        }
                      >
                        <input
                          type="text"
                          name="option"
                          placeholder="Text"
                          value={option.text}
                          onChange={(e) => {
                            const updatedQuestions = questions.map(
                              (question) => {
                                if (question.id === selectedQuestion) {
                                  question.options = question.options.map(
                                    (opt) => {
                                      if (opt.id === option.id) {
                                        opt.text = e.target.value;
                                      }
                                      return opt;
                                    }
                                  );
                                }
                                return question;
                              }
                            );
                            setQuestions(updatedQuestions);
                          }}
                        />
                      </div>
                    )}
                    {(selected[0].optionType === "text_image" ||
                      selected[0].optionType === "image") && (
                      <>
                        <div
                          className={`${styles.imageUrlInput} ${
                            option.isCorrect ? styles.selected : ""
                          }`}
                        >
                          <input
                            type="text"
                            name="imageUrl"
                            placeholder="Image URL"
                            value={option.imageUrl}
                            onChange={(e) => {
                              const updatedQuestions = questions.map(
                                (question) => {
                                  if (question.id === selectedQuestion) {
                                    question.options = question.options.map(
                                      (opt) => {
                                        if (opt.id === option.id) {
                                          opt.imageUrl = e.target.value;
                                        }
                                        return opt;
                                      }
                                    );
                                  }
                                  return question;
                                }
                              );
                              setQuestions(updatedQuestions);
                            }}
                          />
                        </div>
                        {selected[0].optionType === "image" ? (
                          <div className={`${styles.optionTextInput}`}></div>
                        ) : null}
                      </>
                    )}
                    <div className={styles.deleteOptionIcon}>
                      {index > 1 ? (
                        <img
                          src={deleteIcon}
                          alt="closeIcon"
                          onClick={() => {
                            const updatedQuestions = questions.map(
                              (question) => {
                                if (question.id === selectedQuestion) {
                                  question.options = question.options.filter(
                                    (opt) => opt.id !== option.id
                                  );
                                }
                                return question;
                              }
                            );
                            setQuestions(updatedQuestions);
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                ))}
              {selected.length > 0 && selected[0].options.length < 4 ? (
                <div className={styles.optionAddButton}>
                  <button
                    className={styles.addOption}
                    onClick={() => {
                      const updatedQuestions = questions.map((question) => {
                        if (question.id === selectedQuestion) {
                          question.options = [
                            ...question.options,
                            {
                              id: uuidv4(),
                              type: "",
                              text: "",
                              imageUrl: "",
                              isCorrect: false,
                            },
                          ];
                        }
                        return question;
                      });
                      setQuestions(updatedQuestions);
                    }}
                  >
                    Add Option
                  </button>
                </div>
              ) : null}
            </div>
            <div className={styles.questionTimer}>
              {quizType === "QA" ? (
                <>
                  <label>Timer</label>
                  <input
                    type="radio"
                    name={`Timer-${selectedQuestion}`}
                    id="OFF"
                    checked={
                      selected.length > 0 ? selected[0].timer === 0 : false
                    }
                    onChange={() => handleTimerChange(0)}
                  />
                  <label htmlFor="OFF">OFF</label>
                  <input
                    type="radio"
                    name={`Timer-${selectedQuestion}`}
                    id="FiveSec"
                    checked={
                      selected.length > 0 ? selected[0].timer === 5 : false
                    }
                    onChange={() => handleTimerChange(5)}
                  />
                  <label htmlFor="FiveSec">5 Sec</label>
                  <input
                    type="radio"
                    name={`Timer-${selectedQuestion}`}
                    id="TenSec"
                    checked={
                      selected.length > 0 ? selected[0].timer === 10 : false
                    }
                    onChange={() => handleTimerChange(10)}
                  />
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
            <button
              className={styles.continueButton}
              onClick={handleCreateQuizBtnClick}
            >
              Create Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateQuestions;
