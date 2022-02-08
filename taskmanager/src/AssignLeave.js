import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useForm} from "react-hook-form";
import moment from "moment";

const AssignLeave = () => {
    const [employeeId, setEmployeeId ]= useState("");
    const [leaveDays, setLeaveDays] = useState("");
    const [submiting, setSubmiting] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm();

      const onSubmit = (data) => {
        //alert(JSON.stringify(data));
        setLeaveDays(data.leave_days);
        setEmployeeId(data.employee_id);
         setSubmiting(true);
       
     
       };
       useEffect(() => {
         if(submiting==true){
            assignLeave()  
            setData();
         setSubmiting(false)
       }
       }, [submiting]);
       
  const setData = () => {
      
    
    setEmployeeId("");
    setLeaveDays("");
  };
       const assignLeave = () => {
        axios
          .post("http://localhost:5000/assignLeave", {
            leave_days: leaveDays,
            employee_id:employeeId,
          })
          .then((res) => {
            if(res.data.message){
              alert(res.data.message) 
            }
            else{
              console.log(res.data); 
              alert("Leavs Assign");
            }
            
          })
          .catch(()=>{
            alert('somthing wrong');
      })
      };

  return (
    <>
      <section className="form-section leaveDetails">
        <div className="container leaveForm">
          <div className="row">
            <div className="col-6 col-lg-4 mx-auto user-input-feild form-in">
              <h1 className="text-center mt-5">Assign Leave</h1>
              <form>
              <div className="form-group">  
                  <label htmlFor="Contact">Employee ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="employee_id"
                    id="employee_id"
                    placeholder="Enter Employee ID"
                    autocomplete="off"
              
                    {...register("employee_id", {
                      required: "Enter Employee ID",
                     
                    })}
                  />
                </div>
                <div className="errror">{errors.employee_id?.message}</div>

                <div className="form-group">
                  <label htmlFor="Contact">Leave Days</label>
                  <input
                    type="text"
                    className="form-control"
                    name="leave_days"
                    id="leave_days"
                    autocomplete="off"
                    placeholder="Enter Leave Day"
               
                    {...register("leave_days", {
                      required: "Enter Leave Days",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Please enter a number",
                      },
                    })}
                  />
                </div>
                <div className="errror">{errors.leave_days?.message}</div>

                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  className="btn btn-primary btnsubmit btn-assign"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AssignLeave;
