import React,{useState,useEffect} from "react";
import {useHistory  } from 'react-router-dom';
import axios from 'axios';
import { useForm,useLocation} from 'react-hook-form';
import { NavLink } from "react-router-dom";

const Login = () => {

  const { register, formState: { errors },handleSubmit } = useForm();
  let employee_id;
  let password;
  const onSubmit = (data) => { 
    employee_id=data.employee_id;
    password=data.password;
  
   LoginUser()
  // alert(JSON.stringify(data)) 
  };

  let history=useHistory()
  
  axios.defaults.withCredentials=true;

  const LoginUser=()=>{
    //event.preventDefault();
    axios.post('http://localhost:5000/login',{employee_id:employee_id,password:password,
    }).then((res)=>{
            if(res.data.message){
              alert(res.data.message) 
            }
            else{
            
             // localStorage.setItem('id',res.data.result[0].id);
              localStorage.setItem('employee_id', employee_id);
              history.push('/home')  
            }     
    })
   };

  return (
    <>
      <div className="section log-in">
        
       <div className="container">
         
          <div className="row">  
          <div className="col-12 col-lg-12 mx-auto user-input-feild">
          <div class="card d-flex justify-content-center card-div">
            
            <div className="title">
            <h5 className="text-center m-3">Rejuvenation Technologies Employee Portal</h5>
            </div>
         
          <div class="card-body login-div">
          <h1 className="d-flex justify-content-center">Login</h1>
            
              <form>
              <div className="form-group  ">
                  <label htmlFor="Contact">Employee ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="employee_id"
                    id="employee_id"
                    placeholder="Enter Employee ID"
                    autocomplete="off"
                    //value={userName}
                   /*  onChange={(e)=>{
                      setUserName(e.target.value); 
                      console.log(e.target.value);
                    }} */
                    {...register("employee_id", { required: 'Required' })}
                    
                  />
                </div>
                <div className="errror text-center">{errors.employee_id?.message}</div>
        
                <div className="form-group">
                  <label htmlFor="Contact">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                 /*    value={password}
                    onChange={(e)=>{
                      setPassword(e.target.value); 
                      
                    }} */
                  
                    {...register("password", { required:'Required' })}
                  />
                </div>
                <div  className="errror text-center">{errors.password?.message}</div>
                <div class="text-center">
                <button type="submit" className="btn btn-primary btnsubmit btnlogin mt-3" onClick={handleSubmit(onSubmit)}>
                  Login
                </button>
                <p className="m-1">If you don't have account?<NavLink to="/register">Register here</NavLink></p>
                </div>
               
              </form>
            
          </div>
          </div>
          </div> 
          
          </div>
        </div>
        </div>
    </>
  );
};

export default Login;
