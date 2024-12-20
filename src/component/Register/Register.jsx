import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  let [user,setUser]=useState({
    first_name:"",
    last_name:"",
    age:"",
    email:"",
    password:"",
  });
  const navigate =useNavigate();
  function goToLogin(){
    navigate("/login")
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
      let {data}=await axios.post("https://routeegypt.herokuapp.com/signup",user);
      if(data.message=='success'){
       goToLogin();
      }else{
       setErrorMsg(data.message)
      }
    }
    setLoading(false);

  }
  function validateForm(){
    const schema=Joi.object({
      first_name:Joi.string().alphanum().required().min(3).max(10),
      last_name:Joi.string().alphanum().required().min(3).max(10),
      age:Joi.number().required().min(20).max(80),
      email:Joi.string().required().email({tlds:{allow:["com","net"]}}),
      password:Joi.string().required().pattern(new RegExp(/^[a-z][0-9]{3}$/)),
    });
    return schema.validate(user,{abortEarly:false});
  }
  return (
    <>
    <div className='my-4 w-50 m-auto'>
      <h1>Register Form</h1>
      {errorsList.map((error,index)=><div key={index} className="alert alert-danger">{error.message}</div>)}
      {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:""}
      <form onSubmit={submitFromData} >
      <div className='input-gp my-3'>
        <label htmlFor="first_name">First Name :</label>
        <input onChange={getFormValue} type="text" className='form-control' name='first_name' />
      </div>
      <div className='input-gp my-3'>
        <label htmlFor="last_name">Last Name :</label>
        <input onChange={getFormValue} type="text" className='form-control' name='last_name' />
      </div>
      <div className='input-gp my-3'>
        <label htmlFor="age">Age :</label>
        <input onChange={getFormValue} type="number" className='form-control' name='age' />
      </div>
      <div className='input-gp my-3'>
        <label htmlFor="email">Email :</label>
        <input onChange={getFormValue} type="email" className='form-control' name='email' />
      </div>
      <div className='input-gp my-3'>
        <label htmlFor="password">Password :</label>
        <input onChange={getFormValue} type="password" className='form-control' name='password' />
      </div>
    
      <button className='btn btn-info my-2 ' type='submit'>
        {loading ? <i className="fa fa-spinner fa-spin"></i>:"Regiser"}
      </button>
      </form>
    </div>
    
    </>
  )
}
