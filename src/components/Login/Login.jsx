import React,{ useState} from 'react'
import './login.css'
import { AiOutlineMail } from 'react-icons/ai'
import { BsKey } from 'react-icons/bs'
import { Navigate } from 'react-router-dom'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email);
    console.log(password);
    if (email === 'foulena@gmail.com' || password === '1234') {
      setError('')
      Navigate('/home')
    } else {
      setError('Email or password is incorrect')
    }
  }

  return (
    <div className='login-container'>
      <div className='login-content'>
        <div className="login-box">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <p className='error'>{ error }</p>
                <div className="form-group">
                  <div className='form-label'>
                    <label> <AiOutlineMail className='logo-login' /> Email address :</label>
                    <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                  </div>
                  <div className='form-label'>
                    <label> <BsKey className='logo-login' /> Password :</label>
                    <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                  </div>
            </div>
            <div className='form-footer'>
            <button type="submit" className="btn btn-primary">Login</button>
            </div>
            </form>
        </div>
        </div>
    </div>
  )
}

export default Login