import React, { useState, useEffect } from "react";
import { useForm, useLocation } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";

const EmployeeMaster = () => {

const [employeeId, setEmployeeId] = useState("");;
const [emailId, setEmailId] = useState("");
const [password, setPassword] = useState("");
const [cpassword, setCpassword] = useState("");
const [submiting, setSubmiting] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    //alert(JSON.stringify(data));
    setEmployeeId(data.employee_id);
    setEmailId(data.email_id);
    setPassword(data.password);
    setCpassword(data.cpassword);
    setSubmiting(true);
  };
  let history=useHistory()

  useEffect(() => {
    
     if(submiting==true){
        addEmployee();
        history.push('/')
   
     setSubmiting(false)
   }
   }, [submiting]);

   
  const addEmployee = () => {
    if(password!==cpassword){
      alert("Password And Confrom Password Not Match")
      history.push('/register')  

    }
    else{
    axios
      .post("http://localhost:5000/employee_master", {
        employee_id:employeeId,
        email_id:emailId,
        password:password,
        cpassword:cpassword,
      })
      .then((res) => {
        if(res.data.message){
         alert(res.data.message) 
         history.push('/register')  
          }
        else
        {
          console.log(res.data);
      
          alert("Employee Sucessfully Register ");
        }
      
      })
      .catch(()=>{
        alert('somthing wrong');
  })
}
  };


  return (
    <>
      <div className="section register">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-12 mx-auto user-input-feild">
              <div class="card d-flex justify-content-center">
                <div className="title">
                  <h5 className="text-center m-3">
                    Rejuvenation Technologies Employee Portal
                  </h5>
                </div>

                <div class="card-body m-1">
                  <h1 className="d-flex justify-content-center">Register</h1>

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
                        {...register("employee_id", {
                          required: "Employee ID Require",
                        })}
                      />
                    </div>
                    <div className="errror">{errors.employee_id?.message}</div>

                    <div className="form-group  ">
                      <label htmlFor="Contact">Email ID</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email_id"
                        id="email_id"
                        placeholder="Enter Email ID"
                        autocomplete="off"
                        {...register("email_id", {
                          required: "Email ID Require",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                          }
                        })}
                      />
                    </div>
                    <div className="errror">{errors.email_id?.message}</div>
                    <div className="form-group">
                      <label htmlFor="Contact">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                        {...register("password", {
                          required: "Password is Require",
                          minLength: {
                            value: 4,
                            message: "Password short"
                          },
                        })}
                      />
                    </div>
                    <div className="errror">{errors.password?.message}</div>
                    <div className="form-group">
                      <label htmlFor="Contact">Repeat your Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="cpassword"
                        id="cpassword"
                        placeholder="Repeat your Password"
                        {...register("cpassword", {
                          required: " Password is Require",
                        })}
                      />
                    </div>
                    <div className="errror ">{errors.cpassword?.message}</div>
                    <div class="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary btnsubmit btnlogin mt-3"
                        onClick={handleSubmit(onSubmit)}
                      >
                        Register
                      </button>
                      <p className="m-1">
                        already have account?{" "}
                        <NavLink to="/">Login Here</NavLink>
                      </p>
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

export default EmployeeMaster;
