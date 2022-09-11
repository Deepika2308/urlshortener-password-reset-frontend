import { useState } from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import { ShowBufferImg } from "./App";
import {API} from "./global.js";
// import { Link } from 'react-router-dom';

//called when submit button in url shortener page is clicked
export function CreateShortUrl() {
  let [shortUrl, setShortUrl] = useState("");
  let [code, setCode] = useState("");
  let [error, setError] = useState("");

  let [buffer, setBuffer] = useState(false);

  //store user information in session to login and logout
  let userSession = sessionStorage.getItem("user");

  let user;
  if (userSession !== null || userSession !== "") {
    user = JSON.parse(userSession);

  }
 
  let email = user.email;


  let formValidation = yup.object({
    longUrl: yup.string().url("Enter a valid URL!!").required("Form cannot be submitted without an URL"),
  });

  let { values, handleSubmit, handleChange, errors } = useFormik({
    initialValues: { longUrl: "" },
    validationSchema: formValidation,
    onSubmit: (values) => {

      // add user name to the values to store in db
      values.email = email;

      setBuffer(true);
      fetch(`${API}/shorten`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "content-type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          if (data.hasOwnProperty('error')) {
            setBuffer(false);
            setError(data.error);
          }
          else {
            setBuffer(false);
            setShortUrl(data.shortUrl);
            setCode(data.code);
          }
        });
    }
  });

  return (
    <form className="container w-50 m-auto d-flex flex-column gap-5 mt-5" onSubmit={handleSubmit}>
      <h3>URL shortener</h3>

      <input className="form-control" id="longUrl" name="longUrl" value={values.longUrl} placeholder="Enter the URL" onChange={handleChange}></input>
      {errors.longUrl ? <div className="text-danger">{errors.longUrl}</div> : ""}
      {error ? <div className="text-danger">{error}</div> : ""}


      {/* <div>Short URL : <span><Link to={`/${code}`}>{shortUrl}</Link></span></div> */}

      <div>Short URL : <span><a href={code} target="_blank" rel="noreferrer">{shortUrl}</a></span></div>

      {buffer ? <ShowBufferImg /> : ""}

      <div className="d-flex justify-content-center">
        <button className="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>
  );
}
