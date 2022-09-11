import "./App.css";
import "./styles.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Register } from "./Register";
import { Login } from "./Login";
import { ForgotPassword } from "./ForgotPassword";
import { ResetPassword } from "./ResetPassword";
import { HomePage } from "./HomePage";
import { Header } from "./Header";
import {UserActivity} from "./UserActivity";
import {API} from "./global.js";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact
            path="/"
            element={
              <>
                <DecideHomePage />
              </>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <>
                <Register />
              </>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          ></Route>
          <Route
            path="/activate/user/:id"
            element={
              <>
                <UserActivation />
              </>
            }
          ></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
          <Route
            path="/resetPassword/:token"
            element={<ResetPassword />}
          ></Route>

          <Route
            path="/userCreatedUrls"
            element={<><DecideHomePage /></>}
          ></Route>

          <Route
            path="/:code"
            element={<CallLongUrl />}
          ></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

//executed when the short url is clicked
function CallLongUrl(){
  let {code} = useParams();

    fetch(`${API}/redirect/${code}`)
    .then(response => response.json())
    .then(data => {
      if(data.hasOwnProperty('error')){
        console.log("Error in redirecting to the original URL");
      }
      else{
        window.location.href = data.msg;
      }
    })

  return(
    <div></div>
  )
}

//to switch between urk shortening page and user activity page
function DecideHomePage() {
  let userSession = sessionStorage.getItem("user");

  let {pathname} = useLocation();

  let user;
  if (userSession !== null || userSession !== "") {
    user = JSON.parse(userSession);
  
  }
  return user ? <><HomePage pathname={pathname} /></> : <Header />;
}

//active token is checked while logging in
//users are allowed to login only if this token is true
//will be executed when link in the mail clicked during registration
function UserActivation() {
  let { id } = useParams();
  useEffect(() => {
    let obj = {
      active: true,
    };

    fetch(`${API}/activateUser/${id}`, {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: { "content-type": "application/json" },
    });
  });
  return (
    <div className="container mt-5">
      <p>Your account has been activated. {<Link to="/login">Login</Link>}</p>
    </div>
  );
}

export function ShowBufferImg() {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-dark" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
export default App;
