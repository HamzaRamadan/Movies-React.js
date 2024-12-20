import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {  
  let [user,setUser]=useState({
    email:"",
    password:"",
  });
  const navigate =useNavigate();
  function goToHome(){
    navigate("/home")
  }
  let [errorMsg,setErrorMsg]=useState("");
  let [errorsList,setErrorsList]=useState([]);
  let [loading,setLoading]=useState(false);
  
  function getFormValue(e){
    let myUser={...user};  // Deep Copy    
    myUser[e.target.name]=e.target.value;
    setUser(myUser);

    // console.log(myUser);
  }

  async function submitFromData(e){
    e.preventDefault(e);
    setLoading(true);
    let validatResponse= validateForm();
    console.log(validatResponse);
    if(validatResponse.error){
      setErrorsList(validatResponse.error.details);
    }else{
      let {data}=await axios.post("https://routeegypt.herokuapp.com/signin",user);
      if(data.message=='success'){
        localStorage.setItem("userToken",data.token);
          props.saveUserData();
        goToHome();
      }else{
       setErrorMsg(data.message)
      }
    }
    setLoading(false);

  }
  function validateForm(){
    const schema=Joi.object({
      email:Joi.string().required().email({tlds:{allow:["com","net"]}}),
      password:Joi.string().required().pattern(new RegExp(/^[a-z][0-9]{3}$/)),
    });
    return schema.validate(user,{abortEarly:false});
  }
  return (
    <>
    <div className='my-4 w-50 m-auto'>
      <h1>Login Form</h1>
      {errorsList.map((error,index)=><div key={index} className="alert alert-danger">{error.message}</div>)}
      {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:""}
      <form onSubmit={submitFromData} >
      <div className='input-gp my-3'>
        <label htmlFor="email">Email :</label>
        <input onChange={getFormValue} type="email" className='form-control' name='email' />
      </div>
      <div className='input-gp my-3'>
        <label htmlFor="password">Password :</label>
        <input onChange={getFormValue} type="password" className='form-control' name='password' />
      </div>
    
      <button className='btn btn-info my-2 ' type='submit'>
        {loading ? <i className="fa fa-spinner fa-spin"></i>:"Login"}
      </button>
      </form>
    </div>
    
    </>
  )
}
