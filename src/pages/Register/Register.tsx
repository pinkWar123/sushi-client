import "./Register.css";
import InputBox from "../../components/InputBox/InputBox";
import Button from "../../components/Button/Button";
import { useState } from "react";
import axios from "axios";
import Modal from "../../components/Modal/Modal"; // Import the Modal
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { callRegister } from "../../services/account";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: 0,
    phone: "",
    citizenID: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null); // State to control modal message
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) =>
      name === "gender"
        ? {
            ...prevData,
            gender: parseInt(value),
          }
        : {
            ...prevData,
            [name]: value,
          }
    );
  };

  const validateForm = () => {
    let validationError = null;

    if (formData.password !== formData.confirmPassword) {
      validationError = "Passwords do not match";
    } else if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      validationError = "Please enter a valid email";
    }

    setError(validationError);
    return validationError === null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await callRegister(formData);
      setModalMessage("Successfully Registered!");
      setIsModalOpen(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setModalMessage("Registration failed. Please try again.");
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("API Error Response:", error.response);
          setModalMessage("Error: " + error.response.data);
          setIsModalOpen(true);
          setModalMessage(error.response.data);
          if (error.response.data.errors) {
            console.log("Validation errors:", error.response.data.errors);
          }
        } else {
          console.error("Error without response:", error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
      console.error("Error during registration:", error);
      // setModalMessage('Registration failed. Please try again.');
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="register">
      <div className="background"></div>
      <div className="container">
        <div className="register-title text-center text-8xl font-dancing">
          Register Page
        </div>
        <div className="form-container-register">
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="box-container-register">
              <InputBox
                id="name"
                label="Enter full-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <InputBox
                id="email"
                label="Enter email"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={
                  error && !/\S+@\S+\.\S+/.test(formData.email)
                    ? "Invalid email address"
                    : undefined
                }
              />

              <select
                name="gender"
                id="sex-select"
                className="w-100"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value={1}>Male</option>
                <option value={0}>Female</option>
              </select>

              <div id="nums-data">
                <InputBox
                  id="phone"
                  label="Enter phone"
                  type="tel"
                  name="phone"
                  size={45}
                  value={formData.phone}
                  onChange={handleChange}
                />
                <InputBox
                  id="citizenID"
                  label="Enter citizenID"
                  type="number"
                  name="citizenID"
                  size={45}
                  value={formData.citizenID}
                  onChange={handleChange}
                />
              </div>

              <InputBox
                id="dateOfBirth"
                label="Date of birth"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
              <InputBox
                id="password"
                label="Enter password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={error && !formData.name ? "Name is required" : undefined}
              />
              <InputBox
                id="confirmPassword"
                label="Re-enter password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            {/* {error && <div className="error-message">{error}</div>} */}
            <div className="foot-panel w-full flex justify-center items-center flex-col">
              <Button
                type="submit"
                content={isLoading ? "Registering..." : "Register"}
                disabled={isLoading}
              />
              <div className="register-panel w-full flex justify-center mt-2">
                <p>Already have an account?</p>
                <a href="/login" className="ml-3">
                  Login
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Modal for success or error */}
      {isModalOpen && <Modal message={modalMessage!} onClose={closeModal} />}
    </div>
  );
}

export default Register;
