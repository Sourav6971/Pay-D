import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password != formData.confirmPassword) {
      alert("passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/signup",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          password: formData.password,
        }
      );
      if (response.status == 200) {
        console.log(response.data.token);
      } else {
        console.log(response.data);
      }
      alert("Signup successfull");
    } catch (e) {
      console.log("error in signup");
      alert("Signup failed:Try after some time");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Sign Up</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          className="input-field"
          name="firstName"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="input-field"
          name="lastName"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Username"
          className="input-field"
          name="username"
          onChange={handleChange}
        />

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input-field"
            name="password"
            onChange={handleChange}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
        <input
          type="text"
          placeholder="Confirm Password"
          name="confirmPassword"
          className="input-field"
          onChange={handleChange}
        />

        <button className="submit-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
