import React from "react";
import {useHistory  } from 'react-router-dom';
import axios from 'axios';
import { useForm} from 'react-hook-form';




const AdminLogin = () => {
    const { register, formState: { errors },handleSubmit } = useForm();
    let user_name;
    let password;
    const onSubmit = (data) => { 
        user_name=data.user_name;
        password=data.password;
      // alert(JSON.stringify(data)) 
       LoginAdmin()
      };
    
      let history=useHistory();

      const LoginAdmin=()=>{
        //event.preventDefault();
        axios.post('http://localhost:5000/admin_login',{user_name:user_name,password:password,
        }).then((res)=>{
                if(res.data.message){
                  alert(res.data.message) 
                }
                else{
                  localStorage.setItem('menu', 'AdminHomePage');
                 localStorage.setItem('user_name',res.data.result[0].user_name);
               //   localStorage.setItem('employee_id', employee_id);
                history.push('/AdminHomePage')  
                }     
        })
       };
  return (
  <>
  <div className="section log-in">
       <div className="container">
          <div className="row">
            
          <div className="col-12 col-lg-12 mx-auto user-input-feild">
          <div className="card d-flex justify-content-center card-div">
            <div className="title">
            <h5 className="text-center m-3">Rejuvenation Technologies Employee Portal</h5>
            </div>
         
          <div className="card-body login-div">
          <h1 className="d-flex justify-content-center">Admin Login</h1>
            
              <form>
              <div className="form-group  ">
                  <label htmlFor="Contact">User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="user_name"
                    id="user_name"
                    placeholder="Enter User Name "
                    autocomplete="off"
              
                    {...register("user_name", { required: 'Required' })}
                    
                  />
                   <div className="errror">{errors.user_name?.message}</div>
                </div>
               
        
                <div className="form-group">
                  <label htmlFor="Contact">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    {...register("password", { required:'Required' })}
                  />
                   <div  className="errror">{errors.password?.message}</div>
                </div>
               
                <div className="text-center">
                <button type="submit" className="btn btn-primary btnsubmit btnlogin mt-3" onClick={handleSubmit(onSubmit)}>
                  Login
                </button>
               
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

export default AdminLogin;
