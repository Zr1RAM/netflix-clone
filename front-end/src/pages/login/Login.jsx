import { useRef, useState } from 'react'
import './login.scss'

const Login = () => {

    

  return (
    <div className='login'>
        <div className="top">
            <div className="wrapper">
                <img 
                    className='logo'
                    src="https://images.ctfassets.net/y2ske730sjqp/821Wg4N9hJD8vs5FBcCGg/9eaf66123397cc61be14e40174123c40/Vector__3_.svg?w=460" 
                    alt="" 
                />
            </div>
        </div>
        <div className="container">
            <form>
                <h1>Sign In</h1>
                <input type="email" placeholder='email or phone number' name='email' />
                <input type="password" placeholder='password' name='password' />
                <button className='loginButton'> Sign in</button>
                <span>New to Netflix? <b>Sign up now.</b></span>
                <small>
                    This page is protected by Google reCAPTCHA to ensure you're not a bot. <b>Learn more</b>.
                </small>
            </form>
            
        </div>
    </div>
  )
}

export default Login