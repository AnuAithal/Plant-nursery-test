import React, { useState } from "react";
import "./styles/Login.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";
// import { userLogin } from "./services/LoginService";

const Register = ({ setRole }) => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setSignupData(() => ({
      //(prevData)=> ({...prevData,[name]:value})
      ...signupData,
      [name]: value,
    }));
  }
  console.log("loginnnnnnnn", signupData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://13.50.185.10:8080/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem("userData", JSON.stringify(userData));
        setRole(userData.role);

        console.log(userData);
        if (userData.role === "user") {
          navigate("/userHome");
        } else if (userData.role === "staff") {
          navigate("/staffHome");
        } else if (userData.role === "admin") {
          navigate("/adminHome");
        } else {
          // Handle unknown role
          console.error("Unknown role:", userData.role);
        }
        // setRole(userData.role);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: "55px" }}>
      <ScrollToTop />
      <Navbar />
      <section className="background-radial-gradient overflow-hidden">
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
              <h1
                className="my-5 display-5 fw-bold ls-tight"
                style={{ color: "hsl(218, 81%, 95%)" }}
              >
                Welcome to{" "}
                <span
                  style={{
                    color: "#0E6840",
                    textShadow: "4px 4px 6px rgba(255, 255, 255, 0.5)",
                  }}
                >
                  Plant Nursery
                </span>{" "}
                <br />
              </h1>
              <p
                className="mb-4 opacity-70"
                style={{
                  color: "white",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
                }}
              >
                Explore our wide range of plants and gardening supplies. Log in
                to get started with your plant-growing journey!
              </p>
            </div>

            <div className="login-card bg-glass">
              <div className="card-body px-4 py-5 px-md-5">
                <h3
                  style={{
                    marginBottom: "2em",
                    fontWeight: "bold",
                    fontSize: "30px",
                    color: "#0E6840",
                    textShadow: "4px 4px 6px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  Register
                </h3>
                <form onSubmit={handleSubmit}>
                  <div class="form-outline mb-4">
                    <input
                      type="text"
                      id="form3Example3"
                      class="form-control"
                      placeholder="Username"
                      name="userName"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div class="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3"
                      class="form-control"
                      placeholder="E-mail"
                      name="email"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div class="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example4"
                      class="form-control"
                      placeholder="Password"
                      name="password"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  {/* <div className="form-outline mb-4">
                    <select
                      className="form-select"
                      name="role"
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="user">User</option>
                      <option value="staff">Staff</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div> */}

                  <button
                    type="submit"
                    className="gif-button"
                    disabled={loading}
                  >
                    {loading ? "Signing up..." : "Signup"}
                  </button>
                </form>
                <br />
                <p>
                  Already have an account?{" "}
                  <a
                    style={{
                      fontWeight: "bold",
                      cursor: "pointer",
                      color: "green",
                    }}
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
