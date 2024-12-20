import logo from './logo.svg';
import './App.css';
import Home from './component/Home/Home';
import Tvshows from './component/Tvshows/Tvshows';
import People from './component/People/People';
import About from './component/About/About';
import Networks from './component/Networks/Networks';
import Details from './component/Details/Details';
import Navbar from './component/Navbar/Navbar';
import Movies from './component/Movies/Movies';
import Notfound from './component/Notfound/Notfound';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import Logout from './component/Logout/Logout';
import { Routes,Route, useNavigate, Navigate } from 'react-router-dom';
import { useState ,useEffect } from 'react';
import jwtDecode from 'jwt-decode';

function App() {
 
  const [userData,setUserData]=useState();
  
  let navigate =useNavigate();
  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodeToken = jwtDecode(encodedToken);
    setUserData(decodeToken);
    console.log(decodeToken);
    console.log(userData);
  }
  useEffect(() => {
    if(localStorage.getItem('userToken')!=null){
      saveUserData();
    } 
  }, [])
  function logout() {
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/login');
    
  }

  function ProtectedRoute(props){
    if (localStorage.getItem('userToken')==null){
        return <Navigate to='/login'/>
    }
    else{
        return props.children;
    }
  }

  return (
   <>
   <Navbar userData={userData} logout={logout} />
   <div className="container">
    <Routes>
    <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
      <Route path="home" element={<ProtectedRoute><Home/></ProtectedRoute> }></Route>
      <Route path="movies" element={<ProtectedRoute><Movies/></ProtectedRoute>}></Route>
      <Route path="tvshows" element={<ProtectedRoute><Tvshows/></ProtectedRoute>}></Route>
      <Route path="people" element={<ProtectedRoute><People/></ProtectedRoute>}></Route>
      <Route path="about" element={<About/>}></Route>
      <Route path="network" element={<Networks/>}></Route>
      <Route path="details" element={<Details />}></Route>
      <Route path="login" element={<Login  saveUserData={saveUserData}/>}></Route>
      <Route path="register" element={<Register/>}></Route>
      <Route path="login" element={<Logout/>}></Route>
      <Route path="*" element={<Notfound/>}></Route>

    </Routes>
   </div>

   </>
  );
}

export default App;
