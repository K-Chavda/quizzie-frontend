import axios from "axios";
import { showToast } from "../components/Toast/Toast";
import { BASE_URL } from "../utils/Constants";

const RegisterUser = async ({ name, email, password, setActiveTab }) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/register`, {
      name,
      email,
      password,
    });
    showToast(response.data.message, "success");
    setActiveTab("Login");
    return response.data;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const LoginUser = async ({ email, password, navigate }) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, {
      email,
      password,
    });
    await localStorage.setItem("token", response.data.token);
    await localStorage.setItem("userId", response.data.data[0].id);
    navigate("/dashboard");
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

export { RegisterUser, LoginUser };
