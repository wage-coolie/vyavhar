import {React , useRef,useContext} from 'react'
import './login.css'
import {loginCall} from '../../apiCalls'
import {AuthContext} from '../../context/AuthContext'

export default function Login() {
  const email = useRef();
  const password = useRef();
  const {user ,isFetching,error,dispatch} = useContext(AuthContext)
  const handleClick = (e) => {
    
    e.preventDefault();
    loginCall({email:email.current.value,password:password.current.value},dispatch);
  };

	return (
		<div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Vyavhar</h3>
          <span className="loginDesc">
            The MayaWorld is Cruel Yaar...
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Email" type='email' ref={email}  required className="loginInput" />
            <input placeholder="Password" type='password' ref={password} minLength='5' required className="loginInput" />
            <button className="loginButton">Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
	)
}