import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export function Login() {
  let navigate = useNavigate();

  let [error, setError] = useState("");

  let { values, handleSubmit, handleChange } = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => {
      fetch(`http://127.0.0.1:4600/login`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "content-type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.hasOwnProperty("error")) {
            setError(data.error);
          } else {
            sessionStorage.setItem("user", JSON.stringify(data.msg));
            navigate("/");
          }
        });
    },
  });
  return (
    <div className="container mt-5 py-4">
      <h3>Login</h3>
      {/* show error msg if any */}
      {error ? <div className="text-danger mt-4">{error}</div> : ""}

      <form
        className="d-flex flex-column gap-4 w-50 m-auto mt-4"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control"
          id="email"
          name="email"
          type="email"
          placeholder="Email Id"
          value={values.email}
          onChange={handleChange}
        ></input>
        <input
          className="form-control"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        ></input>
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-dark fw-bold" type="submit">
            Login
          </button>
          <button
            className="btn btn-dark fw-bold"
            type="button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>

      <div className="mt-4">
        <Link to="/forgotPassword">Forgot Password?</Link>
      </div>
    </div>
  );
}
