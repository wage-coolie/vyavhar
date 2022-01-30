import {React,useRef} from 'react'
import './register.css'
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleclick = async(e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value){
      passwordAgain.current.setCustomValidity("passwords dont match!")
    }else{
      const user = {
        username:username.current.value,
        email:email.current.value,
        password:password.current.value,
      }; 
      try{
        const res = await axios.post('/auth/register',user)
        navigate('/login')

      }catch(e){
        console.log(e);
      }
    }
  }



	return (
		<div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Vyavhar</h3>
          <span className="loginDesc">
           Register to Enter...
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleclick} >
            <input placeholder="Username" ref={username} required className="loginInput" />
            <input placeholder="Email" ref={email} type='email' required className="loginInput" />
            <input placeholder="Password" ref={password} type='password' required className="loginInput" />
            <input placeholder="Password Again" ref={passwordAgain} type='password' required className="loginInput" />
            <button className="loginButton" type='submit'>Sign Up</button>
            <button className="loginRegisterButton">
              <Link to="/login" style={{textDecoration:'none'}} >
                Log into Account
              </Link>
              
            
            </button>
          </form>
        </div>
      </div>
    </div>
	)
}