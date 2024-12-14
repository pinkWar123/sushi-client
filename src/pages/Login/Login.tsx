import "./Login.css";
import InputBox from "../../components/InputBox/InputBox";
import Button from "../../components/Button/Button";
import { useState } from "react";
import axios from "axios";
import { callLogin } from "../../services/account";
import { useAppDispatch } from "../../hooks/redux";
import { getUserCredentials, login } from "../../redux/accountSlice";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/paths";
import { ILoginResponse } from "../../@types/response/account";
import { PayloadAction } from "@reduxjs/toolkit";

function Login() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    rememberMe: true,
  });
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null); // For handling API error messages
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation (optional)
    if (!formData.userName || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError(null); // Reset any previous error
    console.log(formData);
    try {
      const res = await dispatch(
        login({
          userName: formData.userName,
          password: formData.password,
        })
      );

      if (login.fulfilled.match(res)) {
        const { userName } = res.payload; // TypeScript now knows this is ILoginResponse
        console.log("userName", userName);
        message.success("Login successfully");
        await dispatch(getUserCredentials());
        navigate("/" + PATH.WELCOME.path, {
          state: { userName },
        });
      } else {
        message.error("Login failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("API Error Response:", error.response);
          setError("Invalid username or password");
        } else {
          console.error("Error without response:", error.message);
          setError("Network error, please try again later");
        }
      } else {
        console.error("Unexpected error:", error);
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className="login">
      <div className="background"></div>
      <div className="container">
        <div className="login-title text-center text-8xl font-dancing">
          Login Page
        </div>
        <div className="form-container-login">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="box-container-login">
              <InputBox
                id="userName"
                label="Enter email/phone"
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />
              <InputBox
                id="password"
                label="Enter password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="forget-password w-full flex justify-between items-center">
                <div className="flex justify-center items-center pl-1 pr-1">
                  <input
                    type="checkbox"
                    id="rmb-checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <label htmlFor="rmb-checkbox" className="pl-2">
                    Remember me?
                  </label>
                </div>
                <a href="#">Forget password?</a>
              </div>
            </div>
            <div className="foot-panel w-full flex justify-center items-center flex-col">
              <Button
                type="submit"
                content={isLoading ? "Logging in..." : "Login"}
                disabled={isLoading}
              />
              <div className="register-panel w-full flex justify-center mt-2">
                <p>Don't have an account?</p>
                <a href="/register" className="ml-3">
                  Register
                </a>
              </div>
            </div>
            <div className="error-login-container">
              {error && <div className="error-message-login">{error}</div>}{" "}
              {/* Show error message */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
