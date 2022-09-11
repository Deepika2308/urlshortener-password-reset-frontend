import {useParams,Link} from 'react-router-dom';
import {useState} from 'react';

export function ResetPassword()

{
    const {token} = useParams();
    let[password,setPassword] = useState("");
    let[msg,setMsg] = useState("");
    let[submitbtn,setSubmitbtn] = useState(false);


    function onSubmit(e) {
        let obj={token:token,password:password};
        e.preventDefault();
        fetch(`http://127.0.0.1:4600/saveNewPassword`,{
            method:"PUT",
            body:JSON.stringify(obj),
            headers:{"content-type":"application/json"},
        })
        .then(response => response.json())
        .then(data => {
            if(data.hasOwnProperty('error')){
                if(data.error.name === "TokenExpiredError"){
                    setMsg("Password link has expired. Go to forgot password page and reset the password");
                }
                if(data.error.name === "errorchangingpassword"){
                    setMsg("Error in changing password. Try again.");
                }
                else{
                    setMsg("Password link has expired. Go to forgot password page and reset the password");
                }
            }
            else{
               
                setMsg(data.msg);
                setSubmitbtn(true);
            }
        })
    }
    return(
        <form className="container d-flex flex-column gap-3 w-50 m-auto mt-5" onSubmit={onSubmit}>
            <h4>Reset Password</h4>
            <div className="d-flex gap-3">
            <input className="form-control" id="password" name="password" type="password" placeholder="New Password" onChange={(event) => setPassword(event.target.value)} required></input>
            <button className="btn btn-primary" type="submit" disabled={submitbtn}>Submit</button>
            </div>
            {msg ? <div className="d-flex flex-column gap-3"><div className="text-danger">{msg}</div>{!submitbtn ? <Link to="/forgotPassword">Forgot Password</Link> : <Link to="/login">Login</Link>}</div> :""}
        </form>
    )
}