import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export function UserActivity() {

  let[activity,setActivity] = useState([]);
  let[error,setError] = useState("");
let[len,setLen] = useState(true);

 let userSession= sessionStorage.getItem('user');
 let user;
 if(userSession !== null || userSession !== ''){
  user=JSON.parse(userSession);
 }

let userEmail = user.email;

useEffect(() => {
  fetch(`http://127.0.0.1:4600/acitivity/${userEmail}`)
  .then(response => response.json())
  .then(data => {
    if(data.hasOwnProperty('error')){
      setError(data.error);
    }
    else{
      if(data.msg !== undefined){
      setActivity(data.msg);
      setLen(true);
      }
      else{
        setLen(false);
      }
      
    }
  })
},[])

  return (
    len ? 
    <div className="my-5">
      {error? error :""}
      <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Short Url</th>
          <th scope="col">Created Date</th>
        </tr>
      </thead>
      <tbody>
       {activity.map((obj,index) => {

          let date = obj.date;
          let dateObj = new Date(date);
          let dateRes = dateObj.toLocaleString();
          
          return <tr key={index}>
          <td>{index+1}</td>
          <td><a href={obj.code} target="_blank" rel="noreferrer">{obj.shortUrl}</a></td>
          <td>{dateRes}</td>
        </tr> 
        }) }
      </tbody>
    </table>
    </div> :<p className="mt-5">No URLs created yet!!</p>
    
  );
}
