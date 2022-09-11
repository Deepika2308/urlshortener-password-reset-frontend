import { Link } from "react-router-dom";
import {useEffect,useState} from 'react';
import {API} from "./global.js";

export function Header() {
  return (
    <div className="w-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-end">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarHead"
            aria-controls="navbarHead"
            aria-expanded="false"
            aria-label="toggle navigation"
          >
            <span className="navbar-toggler-icon text-dark"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarHead"
          >
            <ul className="navbar-nav d-lg-flex gap-3">
              <li className="nav-item">
                <Link className="nav-link fs-5 text-center" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-5 text-center" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <DashboardMonthlyCounts />

    </div>

  );
}

function DashboardMonthlyCounts(){

  let[counts,setCounts] =useState([]);
  let[monthlyCounts,setmonthlyCounts] = useState([]);

  useEffect(() => {
    fetch(`${API}/getDailyCount`)
    .then(response => response.json())
    .then(data => {
      
      setCounts(data);
    });

    fetch(`${API}/getMonthlyCount`)
    .then(response => response.json())
    .then(data => {
     
      setmonthlyCounts(data);
    })
  },[])

  return(
    // dashboard showing monthly counts
    <div className="container mt-5 w-50 d-flex flex-column gap-5">
    
      <div className="daily-counts d-flex flex-column gap-3 p-1 bg-dark text-light"><div className="fw-bold">Daily Counts</div>
      {counts.map((obj,index) => {
         return <div key={index}>{`${obj._id} - ${obj.count}`}</div>
      })}</div>
      
      <div className="monthly-counts d-flex flex-column gap-3 p-2 bg-dark text-light">
      <div className="fw-bold">Monthly Counts</div>
      {monthlyCounts.map((obj,index) => {
        let month = getMonth(obj._id);
         return <div key={index}>{`${month} - ${obj.count}`}</div>
      })}
      </div>
   
  </div>
  )
}


function getMonth(id){
  
  switch(id){
    case 1:
      return "Jan";

      case 2:
        return "Feb";

        case 3:
          return "March";

        case 4:
          return "April";

        case 5:
          return "May";

        case 6:
          return "June";

        case 7:
          return "July";

        case 8:
          return "August";

        case 9:
          return "September";

        case 10:
          return "October";

        case 11:
          return "November";

        case 12:
          return "December";

        default:
          return "Invalid month";
  }
}