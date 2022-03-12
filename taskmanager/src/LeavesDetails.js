import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useForm} from "react-hook-form";
import moment from "moment";

const LeavesDetails = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const today = new Date().toISOString().substring(0, 10);
  let history = useHistory();
  let employee_id = localStorage.getItem("employee_id");
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [leaveType, setLeaveType] = useState("");
  const [leaveDays, setLeaveDays] = useState("");
  const [submiting, setSubmiting] = useState(false);
  const [list, setList] = useState([]);
  const [count, setCount] = useState();
  const [allLeaves, setAllLeaves] = useState("");
  const [remLeaves, setRemLeaves] = useState("");

  const showList = () => {
    
    axios.post("http://localhost:5000/emp_leave_status",{employee_id }).then((res) => {
      if (res?.data?.result) {
        setList(res.data.result);
     //   console.log(res.data.result);
      }
    });
  };

  useEffect(() => {
    showList();
  
  }, []);
  useEffect(() => {}, [list]);

  useEffect(() => {
    
    showLeaves();
  }, []);
   useEffect(() => {},[allLeaves,remLeaves]);

  const onSubmit = (data) => {
   //alert(JSON.stringify(data));
  setLeaveDays(data.leave_days);
  setLeaveType(data.leave_type);
   setSubmiting(true);

  };

useEffect(() => {
 // console.log(submiting);
  if(submiting==true){
 // console.log(leaveDays);
  addLeaveData();
  showList();
  setData();

  setSubmiting(false)
}
}, [submiting]);

  const setData = (event) => {
    
    setDate(new Date().toISOString().substring(0, 10));
    setLeaveType("");
    setLeaveDays("");
  };
  

  const showLeaves = () => {
      axios.post("http://localhost:5000/leaves" ,{
        employee_id
      }).then((res) => {
        if (res?.data?.result) {
          setAllLeaves(res.data.result[0].total_leave);
          setRemLeaves(res.data.result[0].remain_leave)
           //console.log(res.data.result);
        }
      });
    };

  const addLeaveData = () => {
    console.log(leaveDays);
    console.log(allLeaves);
    if(leaveDays>allLeaves)
    {
      alert("Leaves Not Remaining");
    }
    else{
      axios
      .post("http://localhost:5000/add_leave_details", {
        date: date,
        leave_type: leaveType,
        leave_days: leaveDays,
        employee_id,
      })
      .then((res) => {
       // console.log(res.data);
      
        alert("Leave Deatails Save Successfully");
      })
      .catch(()=>{
        alert('somthing wrong');
  })
    }
 
  };


  return (
    <>
      <section className="form-section leaveDetails">
        <div className="mx-5 float-end btn-leaves-days">
          <button type="button" className="btn  btn-info mx-2">
            Total Leaves: {allLeaves}
          </button>
          <button type="button" className="btn  btn-info">
            Remaining Leaves: {remLeaves}
          </button>
        </div>

        <div className="container leaveForm">
          <div className="row">
            <div className="col-6 col-lg-6 mx-auto user-input-feild form-in">
              <h1 className="text-center mt-5">Leaves Application</h1>
              <form>
                <div className="form-group m-1 ">
                  <label htmlFor="Name">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    placeholder="dd/mm/yyyy"
                    autocomplete="off"
                    min={today}
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="leave Type">Leave Type</label>
                  <select
                    id="leave_type"
                    className="form-control"
                    name="leave_type"
                    autocomplete="off"
                    // value={leaveType}
                    // onChange={(e) => {
                    //   setLeaveType(e.target.value);
                    // }}
                    {...register("leave_type", {
                      required: "Select Leave Type",
                      
                    })}
                  >
                    <option value="" selected>
                      Select Leave Type...
                    </option>
                    <option value="Casual leave">Casual leave</option>
                    <option value="Sick leave">Sick leave</option>
                    <option value="Marriage Leave"> Marriage Leave</option>
                    <option value="Bereavement Leave">Bereavement Leave</option>
                  </select>
                </div>
                <div className="errror">{errors.leave_type?.message}</div>

                <div className="form-group">
                  <label htmlFor="Contact">Leave Days</label>
                  <input
                    type="text"
                    className="form-control"
                    name="leave_days"
                    id="leave_days"
                    placeholder="Enter Leave Day"
                    autocomplete="off"
                    // value={leaveDays}
                    // onChange={(e) => {
                    //   setLeaveDays(e.target.value);
                    // }}
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
                  className="btn btn-primary btnsubmit btnleave "
                >
                  Submit
                </button>
              </form>
             
            </div>
            
          </div>
          <table
            cellPadding="0"
            cellspacing="1"
            border="0"
            className="datatable table table-striped table-bordered"
          >
            <thead className="text-center">
              <tr>
            
                <th>Date</th>
                <th>Leave Type</th>
                <th>Leave Days</th>
                <th>Status</th>
               
               
               
              </tr>
            </thead>
            <tbody>
              {list?.map((itm, i) => {
                return (
                    <>
                  <tr className="text-center" key={itm.id}>
                    <td>{moment(itm.date).format("DD-MM-YYYY")}</td>
                    <td>{itm.leave_type}</td>
                    <td>{itm.leave_days} </td>
                    <td>{itm.status}</td>
         
                  </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default LeavesDetails;
