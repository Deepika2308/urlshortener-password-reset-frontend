import { useNavigate } from "react-router-dom";
import {useFormik} from 'formik';
import {Modal} from 'react-bootstrap';
import {useState} from 'react';
import {API} from "./global.js";

export function Register(){
    let navigate= useNavigate();
    let[show,setShow] = useState(false);
    let[msg,setMsg] = useState("");
    let [bufferImg, setBufferImg] = useState(false);

    let {values,handleChange,handleSubmit} = useFormik({
        initialValues:{fname:"",lname:"",email:"",password:""},
        onSubmit:(values) => {
          setBufferImg(true);
            fetch(`${API}/register`,{
                method:"POST",
                body:JSON.stringify(values),
                headers:{"content-type":"application/json"},
            })
            .then(response => response.json())
            .then(data =>{
               setShow(true);
               setMsg(data.msg);
               setBufferImg(false);
            })
        }
    })
    return(
       <div className="container mt-5 bg-dark py-4">
        <h3 className="text-white">Sign Up</h3>
        <form className="d-flex flex-column gap-4 w-50 m-auto mt-5" onSubmit={handleSubmit}>
        <input className="form-control" id="fname" name="fname" type="text" placeholder="First Name" value={values.fname} onChange={handleChange}></input>
        <input className="form-control" id="lname" name="lname" type="text" placeholder="Last Name" value={values.lname} onChange={handleChange}></input>
            <input className="form-control" id="email" name="email" type="email" placeholder="Email Id" value={values.email} onChange={handleChange}></input>
            <input className="form-control" id="password" name="password" type="password" placeholder="Password" value={values.password} onChange={handleChange}></input>
            <div className="d-flex gap-2 justify-content-center">
            <button className="btn btn-dark bg-white text-dark fw-bold" type="submit">Sign Up</button>
            <button className="btn btn-dark bg-white text-dark fw-bold" type="button" onClick={() => navigate("/")}>Cancel</button>
            </div>

            {bufferImg ? <ShowBufferImg /> : ""}

            <Modal show={show}>
            <Modal.Body>
              <p>{msg}</p>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-danger" aria-label="Close" onClick={() => setShow(!show)}>
                Close
              </button>
            </Modal.Footer>
          </Modal>
        </form>
       </div>
    )
}

function ShowBufferImg() {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}