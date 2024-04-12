import { useRef, useState } from 'react'
import './register.scss'

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const [userInfo, setUserInfo] = useState({email: "", password: ""});
    // try to redo the above two states as userInfo instead throughout this component. 
    // (or perhaps this is the way as intended for a reason?)
    const emailRef = useRef();
    const passwordRef = useRef();
    const handleClick = (/* e */) => {
        if(emailRef.current.value !== "") {
            setEmail(emailRef.current.value);
        }
        if(passwordRef.current.value !== "") {
            setPassword(passwordRef.current.value);
        }
        //setUserInfo((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

  return (
    <div className='register'>
        <div className="top">
            <div className="wrapper">
                <img 
                    className='logo'
                    src="https://images.ctfassets.net/y2ske730sjqp/821Wg4N9hJD8vs5FBcCGg/9eaf66123397cc61be14e40174123c40/Vector__3_.svg?w=460" 
                    alt="" 
                />
                <button className="loginButton">Sign In</button>
            </div>
        </div>
        <div className="container">
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h2>Watch anywhere. Cancel anytime</h2>
            <p>Ready to watch? Enter your email to create or restart your membership</p>
            {!email ? (
                <div className="input">
                    <input 
                        type="email" 
                        placeholder='email address' 
                        ref={emailRef}
                        name='email'
                    />
                    <button className="registerButton" onClick={handleClick}>Get Started</button>
                </div>
            ) : (
                <form className='input'>
                    <input 
                        type="password" 
                        placeholder='password' 
                        ref={passwordRef}
                        name='password'
                    />
                    <button className="registerButton" onClick={handleClick}>Start</button>
                </form>
            )
            }
            
        </div>
    </div>
  )
}

export default Register