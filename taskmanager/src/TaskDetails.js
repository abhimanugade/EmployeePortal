import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, useLocation } from "react-hook-form";

const TaskDetails = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const today = new Date().toISOString().substring(0, 10)
  const [module, setModule] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [hours, setHours] = useState("");
  const [comment, setComment] = useState("");
  const [totalHours, setTotalHours] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [selmodule, setSelModule] = useState("");
  const [submiting, setSubmiting] = useState(false);
  // const [selId, setSelId] = useState();

  let employee_id = localStorage.getItem("employee_id");

  //fetch module

  const moduleShow = () => {
    axios.post("http://localhost:5000/show_module").then((res) => {
      if (res?.data?.result) {
        setModule(res.data.result);
        setSelModule(res.data.result[0].id);
      }
    });
  };
  const onSubmit = (data) => {
   // alert(JSON.stringify(data));
    setHours(data.hours);
    setComment(data.comment);
    setSubmiting(true);
    
   };

//add item

  const add = () => {

    let filMod = module.filter((itm) => {
      return itm.id == selmodule;
    });
    let module_name = filMod?.length > 0 ? filMod[0].module_name : "";

    console.log(module_name);
    let dt = { module_id: selmodule, module: module_name, hours, comment };
    let h = 0;

    let oldData = tableData ? [...tableData] : [];
    oldData.push(dt);
    console.log(oldData);

    oldData.map((itm) => {
      h += parseInt(itm.hours);
    });
    setTotalHours(h);
    setTableData(oldData);
  };


  //delete item

  const deleteItem = (e, index) => {
    let h = 0;
    e.preventDefault();
    let oldData = [...tableData];
    oldData.splice(index, 1);
    //console.log({ oldData });
    setTableData(oldData);
    oldData.map((itm) => {
      h += parseInt(itm.hours);
    });
    setTotalHours(h);
  };

  //use effect

  useEffect(() => {
    //  console.log({ tableData });
  }, [tableData]);
  useEffect(() => {
    
    if(submiting==true){
     add();
   
  
    setSubmiting(false)
  }
  }, [submiting]);

  //store in db

  const addDetails = () => {
    let oldData = [...tableData];
    
  
      axios
      .post("http://localhost:5000/time_booking", {
        employee_id,
        oldData,
        date,
        totalHours,
      })
      
      .then((res) => {
        alert("details add");
      })
      .catch(() => {
        alert("Record Not Save");
      });
    
      moduleShow();
  };

  //useEffect

  useEffect(() => {}, [module]);
  const handleChange = (e) => {
    setSelModule(e.target.value);
  };

  useEffect(() => {
    moduleShow();

    //    1 time
  }, []);


  return (
    <>
      <section className="form-section mb-5">
        <div className="container">
          <div className="row">
            <h1 className="text-center mt-5">Time Booking</h1>
            <div className="col-12 col-lg-12 mx-auto ">
              <form method="" action="">
                <div className="row mt-3">
                  <div className="col-12 col-lg-3">
                    <label for="hours">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      name="date"
                      autocomplete="off"
                      placeholder="select date"
                      min="1997-01-01"
                      max={today}
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-12 col-lg-3">
                    <label for="hours">Total Hours</label>
                    <input
                      type="text"
                      className="form-control"
                      id="total_hours"
                      name="total_hours"
                      placeholder="Total Hours"
                      autocomplete="off"
                      disabled
                      value={totalHours}
                      onChange={(e) => {
                        setTotalHours(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12 col-lg-3">
                    <label htmlfor="module">Module</label>
                    <select
                      id="module"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                    >
                      <>
                        {module?.map((itm, i) => {
                          return (
                            <option key={itm.module_name} value={itm.id}>
                              {itm.module_name}
                            </option>
                          );
                        })}
                      </>
                    </select>
                  </div>
                  <div className="col-12 col-lg-3">
                    <label htmlfor="hours">Hours</label>
                    <input
                      type="text"
                      className="form-control"
                      id="hours"
                      name="hours"
                      placeholder="Enter Hours"
                      
                      autocomplete="off"
                      // value={hours}
                      // onChange={(e) => {
                      //   setHours(e.target.value);
                      // }}
                      {...register("hours", {
                        required: "Enter Hours",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Please enter a number",
                        },
                        
                      })}

                    />
                     <div className="errror">{errors.hours?.message}</div>
                  </div>
                 
                  <div className="col-12 col-lg-3">
                    <label htmlfor="comment">Comment</label>
                    <input
                      type="text"
                      className="form-control"
                      id="comment"
                      name="comment"
                      placeholder="Comment"
                      // value={comment}
                      autocomplete="off"
                      // onChange={(e) => {
                      //   setComment(e.target.value);
                      // }}
                      {...register("comment", {
                        required: "Enter comment",
                        
                      })}
                    />
                      <div className="errror">{errors.comment?.message}</div>
                  </div>
                
                  <div className="col-12 col-lg-3">
                    <button
                      className="btn btn-danger btn-add mt-4"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Add
                    </button>
                  </div>
                 
                </div>
               
                <table className="table table-responsive table-borderless mt-5">
                  <thead className="thead-dark">
                    <tr className="text-center">
                      <th>Module Name</th>

                      <th>Hours</th>
                      <th>comment</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {tableData?.map((itm, i) => {
                      return (
                        <>
                          <tr >
                            <td>{itm.module}</td>

                            <td>{itm.hours}</td>
                            <td>{itm.comment}</td>

                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={(e) => deleteItem(e, i)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
                <button
                  type="submit"
                  onClick={addDetails}
                  className="btn btn-primary btnsubmit btntask btn-add"
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

export default TaskDetails;
