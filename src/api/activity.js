import axios from "axios";
import { showToast } from "../components/Toast/Toast";
import { BASE_URL, TOKEN, USERID } from "../utils/Constants";

axios.defaults.headers.common["Authorization"] = TOKEN;
const getToken = () => localStorage.getItem("token");
const getUserId = () => localStorage.getItem("userId");

const GetActivity = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/activity/activities`,
      {
        userId: getUserId(),
      },
      {
        headers: { Authorization: getToken() },
      }
    );

    return response.data?.data?.activity;
  } catch (error) {
    showToast(
      error.response?.data?.message ||
        "Something went wrong while fetching activities!",
      "error"
    );
  }
};

const DeleteActivity = async (activityId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/activity/${activityId}`, {
      headers: { Authorization: getToken() },
    });

    return response.data;
  } catch (error) {
    showToast(
      error.response?.data?.message ||
        "Something went wrong while deleting the activity!",
      "error"
    );
  }
};

const GetSingleActivity = async (activityId) => {
  try {
    const response = await axios.get(`${BASE_URL}/activity/${activityId}`, {
      headers: { Authorization: getToken() },
    });
    return response.data?.data;
  } catch (error) {
    showToast(
      error.response?.data?.message ||
        "Something went wrong while fetching the activity!",
      "error"
    );
  }
};

const GetQuestionData = async (activityId) => {
  try {
    const response = await axios.get(`${BASE_URL}/activity/${activityId}`, {
      headers: { Authorization: getToken() },
    });
    if (response && response.data && response.data.success) {
      return response.data?.data;
    } else {
      showToast("Failed to fetch activity data", "error");
    }
  } catch (error) {
    showToast(
      error.response?.data?.message ||
        "Something went wrong while fetching the activity!",
      "error"
    );
  }
};

const CreateOrModifyActivity = async ({
  activityId,
  quizName,
  quizType,
  questions,
}) => {
  try {
    let response;
    if (activityId) {
      response = await axios.patch(
        `${BASE_URL}/activity/${activityId}`,
        {
          title: quizName,
          activityType: quizType,
          questions: questions,
        },
        {
          headers: { Authorization: getToken() },
        }
      );
    } else {
      response = await axios.post(
        `${BASE_URL}/activity/create`,
        {
          title: quizName,
          activityType: quizType,
          questions: questions,
        },
        {
          headers: { Authorization: getToken() },
        }
      );
    }
    return response.data;
  } catch (error) {
    showToast(error.response?.data.message || "Something Went Wrong!", "error");
  }
};

const GetAnalytics = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/activity/analytics`,
      {
        userId: getUserId(),
      },
      {
        headers: { Authorization: getToken() },
      }
    );

    return response.data?.data;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const GetTrendingQuiz = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/activity/trending`,
      {
        userId: getUserId(),
      },
      {
        headers: { Authorization: getToken() },
      }
    );

    return response.data?.data;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const GetQuestionAnalytics = async (activityId) => {
  if (!activityId) {
    return;
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/activity/analytics/${activityId}`,
      {
        headers: { Authorization: getToken() },
      }
    );

    return response.data;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const IncreaseImpressionCount = async (id, questionId) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/activity/activities/${id}/questions/${questionId}/increase-impression`,
      {
        headers: { Authorization: getToken() },
      }
    );

    return response;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const GetQuizData = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/activity/${id}`, {
      headers: { Authorization: getToken() },
    });
    return response.data?.data;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const IncreaseAnswerCount = async (id, questionId, type) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/activity/activities/${id}/questions/${questionId}/increase-answer-count/${type}`,
      {
        headers: { Authorization: getToken() },
      }
    );
    return response.data?.data;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const IncreaseOptionImpression = async (id, questionId, optionId) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/activity/activities/${id}/questions/${questionId}/option/${optionId}/increase-selection-count`,
      {
        headers: { Authorization: getToken() },
      }
    );

    return response;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

export {
  GetActivity,
  DeleteActivity,
  GetSingleActivity,
  GetQuestionData,
  CreateOrModifyActivity,
  GetAnalytics,
  GetTrendingQuiz,
  GetQuestionAnalytics,
  IncreaseImpressionCount,
  GetQuizData,
  IncreaseAnswerCount,
  IncreaseOptionImpression,
};
