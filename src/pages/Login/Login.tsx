import './Login.css';
import InputBox from '../../components/InputBox/InputBox';
import Button from '../../components/Button/Button';
import { useState } from 'react';

interface InputBoxProps {
  id: string;
  label: string;
  type: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

interface ButtonProps {
  type: "button" | "submit" | "reset";
  content: string;
}

function Login() {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    rememberMe: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You can add further form validation and handling logic here
  };

  return (
    <div className="login">
      <div className="background"></div>
      <div className="container">
        <div className="login-title text-center text-8xl font-dancing">Login Page</div>
        <div className="form-container-login">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="box-container-login">
              <InputBox
                id="userName"
                label="Enter email/phone"
                type="text"
                // name="userName"
                // value={formData.userName}
                // onChange={handleChange}
              />
              <InputBox
                id="password"
                label="Enter password"
                type="password"
                // name="password"
                // value={formData.password}
                // onChange={handleChange}
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
              <Button type="submit" content="login" />
              <div className="register-panel w-full flex justify-center mt-2">
                <p>Don't have an account?</p>
                <a href="/register" className="ml-3">Register</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
