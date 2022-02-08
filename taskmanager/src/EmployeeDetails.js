import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const EmployeeDetails = () => {
  const [list, setList] = useState([]);
  

  const showList = () => {
    axios.post("http://localhost:5000/employee_list").then((res) => {
      if (res?.data?.result) {
        setList(res.data.result);
        console.log(res.data.result);
      }
    });
  };


  useEffect(() => {
    showList();
  }, []);
  useEffect(() => {}, [list]);

  const deleteEmployeeData = (employee_id) => {
     axios.post("http://localhost:5000/deleteEmpData",{
      employee_id
    }).then((res) => {
      if(res.data.message){
        alert(res.data.message) 
        
         }
         else{
          alert("Employee Data delete");
          showList();
        
         }
     
    });
    alert(employee_id)
  };
  return (
    <>
      <div id="wrap">
        <div class="container emp-table">
          <h3 className="text-center mt-5">Employee List</h3>
     
          
          <table
            cellPadding="0"
            cellspacing="1"
            border="0"
            class="datatable table table-striped table-bordered "
          >
            <thead className="text-center">
              <tr>
                <th>Emp ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Gender</th>
                <th>Contact No</th>
                <th>DOB   </th>
                <th>Marital Status</th>
                <th>Email ID</th>
                <th>Highest Qualification</th>
                <th>University</th>
                <th>Date Of Passing</th>
                <th>Date Of Joining</th>
                <th>Designation</th>
                <th>Action</th>
               
              </tr>
            </thead>
            <tbody>
              {list?.map((itm, i) => {
                return (
                    <>
                  <tr>
                    <td>{itm.employee_id}</td>
                    <td>{itm.first_name}</td>
                    <td>{itm.last_name}</td>
                    <td>{itm.address1} {itm.address2}</td>
                    <td>{itm.gender}</td>
                    <td>{itm.contact_no}</td>
                    <td>{moment(itm.dob).format("DD-MM-YYYY")}</td>
                    <td>{itm.marital_status}</td>
                    <td>{itm.email_id}</td>
                    <td>{itm.highest_qualification}</td>
                    <td>{itm.university}</td>
                    <td>{moment(itm.date_of_passing).format("DD-MM-YYYY")}</td>
                    <td>{moment(itm.date_of_joining).format("DD-MM-YYYY")}</td>
                    <td>{itm.designation}</td>
                    <td className="text-center">
                        <button
                                className="btn btn-danger btn-delete"
                                onClick={()=> deleteEmployeeData(itm.employee_id)}
                              >
                             Delete
                              </button></td>
                    
                  </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetails;
