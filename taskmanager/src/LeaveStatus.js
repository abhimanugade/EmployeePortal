import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const LeaveStatus = () => {
    
  const [list, setList] = useState([]);

    const showList = () => {
        axios.post("http://localhost:5000/leave_status").then((res) => {
          if (res?.data?.result) {
            setList(res.data.result);
            console.log(res.data.result);
          }
        });
      };
      const ApproveLeave = (employee_id,leave_days,leave_type,date) => {

        axios.post("http://localhost:5000/approve_leave_status",{ employee_id,leave_days,leave_type,date }).then((res,error) => {
          if (res?.data?.result) {
            console.log(res);
             alert('Leave Approved');
             showList()
          }
          else{
            alert('something wrong')
          }
        });
       // alert(employee_id)
      };
      useEffect(() => {
        showList();
      }, []);
      useEffect(() => {}, [list]);

      
  return( 
  <>
   <div id="wrap">
        <div className="container">
          <h3 className="text-center mt-5">Leave Applications</h3>
          <table
            cellPadding="0"
            cellspacing="1"
            border="0"
            className="datatable table table-striped table-bordered"
          >
            <thead className="text-center">
              <tr>
                <th>Employee Id</th>
                <th>Date</th>
                <th>Leave Type</th>
                <th>Leave Days</th>
                <th>Status</th>
                <th>Action</th>
               
               
              </tr>
            </thead>
            <tbody>
              {list?.map((itm, i) => {
                return (
                    <>
                  <tr className="text-center" key={itm.employee_id}>
                    <td>{itm.employee_id}</td>
                    <td>{moment(itm.date).format("DD-MM-YYYY")}</td>
                    <td>{itm.leave_type}</td>
                    <td>{itm.leave_days} </td>
                    <td>{itm.status}</td>
                    <td className="text-center">
                        <button
                                className="btn btn-danger btn-approve"
                               onClick={()=>ApproveLeave(itm.employee_id,itm.leave_days,itm.leave_type,itm.date)}
                              >
                                Approve
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

export default LeaveStatus;
