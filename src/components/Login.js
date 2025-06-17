import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [details, setDetails] = useState({email: '',password:''})
  let navigate = useNavigate();

  const onSubmit = async (e) => { 
    e.preventDefault();
    try {
      const response = await fetch(
        'http://localhost:5000/auth/user/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email: details.email,password: details.password})
          
        }
      )
      const json = await response.json();
      if (json.Success){
        localStorage.setItem('inotebook_tocken',json.authtocken);
        navigate('/');
      }

    } catch  {
      alert('Failed to login')
    }
    
   }

  const onChange = (e) => {
    setDetails({...details,[e.target.name]:e.target.value})
  }
  
  return (
    <>
    <form className='container' onSubmit={onSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" name='email' value={details.email} onChange={onChange} className="form-control" id="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" name='password' value={details.password} onChange={onChange} autoComplete='none' className="form-control" id="password"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </>
  )
}

export default Login