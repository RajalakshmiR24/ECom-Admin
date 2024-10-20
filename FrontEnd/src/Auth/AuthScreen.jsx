import React, { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../state/api"; // Adjust the path as necessary

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    city: "",
    state: "",
    country: "",
    occupation: "",
    phoneNumber: "",
  });

  // RTK Query hooks
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: "",
      email: "",
      password: "",
      fullName: "",
      city: "",
      state: "",
      country: "",
      occupation: "",
      phoneNumber: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Handle login
        const response = await login(formData).unwrap();
        alert(response.message);
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        window.location.href = "/";
      } else {
        // Handle registration
        const response = await register(formData).unwrap();
        alert(response.message);
        toggleForm(); // Switch to login form after registration
      }
    } catch (error) {
      console.error("Authentication error:", error);
      alert(error.data?.message || "Authentication failed");
    }
  };

  return (
    <div>
      <div>
        <h2>
          {isLogin ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="Occupation"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  minLength={10}
                  maxLength={15}
                />
              </div>
            </>
          )}

          <div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
              minLength={3}
              maxLength={20}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              minLength={6}
              maxLength={20}
            />
          </div>

          <button
            type="submit"
            disabled={isLoginLoading || isRegisterLoading}
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div>
          {isLogin ? (
            <p>
              Don't have an account?{" "}
              <button onClick={toggleForm}>
                Register
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button onClick={toggleForm}>
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
