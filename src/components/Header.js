import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  let location = useLocation();
  const navigation = useNavigate();
  const authtocken = localStorage.getItem('inotebook_tocken')

  const Logout =() => {
    localStorage.removeItem('inotebook_tocken')
    navigation('/login')
  }
  const Login =() => { 
    navigation('/login')
   }
   const Signup =() => { 
    navigation('/signup')
   }
  
  
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link  ${location.pathname==="/"? 'active': '' }`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link  ${location.pathname==="/about"? 'active': '' }`} to="/about">
                  About
                </Link>
              </li>
            </ul>
            {authtocken && <button type="button" onClick={Logout} className="btn btn-primary">Logout</button>}
            {!authtocken && <button type="button" onClick={Login} className="btn btn-primary mx-3">Login</button>}
            {!authtocken && <button type="button" onClick={Signup} className="btn btn-primary">Signup</button>}
            
            
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
