import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  return (
    <>
    <nav className={`${styles.test} navbar navbar-expand-lg navbar-light `}>
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Noxe</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    {props.userData?   <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
          <Link className="nav-link" to="home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="movies">Movies</Link>
        </li><li className="nav-item">
          <Link className="nav-link" to="tvshows">Tv show</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="people">People</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="about">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="network">Network</Link>
        </li>
      </ul>:''}
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

       <div className="social-icons d-flex align-items-center ">
          <i className="fab mx-2 fa-facebook"></i>
          <i className="fab mx-2 fa-spotify"></i>
          <i className="fab mx-2 fa-instagram"></i>
          <i className="fab mx-2 fa-youtube"></i>
       </div>
      
      {props.userData?<li className="nav-item">
          <a onClick={props.logout} className="nav-link" >Logout</a>
        </li> :
        <> 
        <li className="nav-item ">
          <Link className="nav-link" to="login">Login</Link>
        </li><li className="nav-item">
          <Link className="nav-link" to="register">Register</Link>
        </li>
        </>}

       
        
        
       
      </ul>
      
    </div>
  </div>
</nav>
    
    
    </>
  )
}
