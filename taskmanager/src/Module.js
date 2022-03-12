import React, { useState, useEffect } from "react";
import axios from "axios";

import { useForm } from "react-hook-form";

const Module = (event) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [moduleName, setModuleName] = useState("");
  const [des, setDes] = useState("");

  const [moduleData, setModuleData] = useState([]);

  const [submiting, setSubmiting] = useState(false);

  const onSubmit = (data) => {
   // alert(JSON.stringify(data));
    setModuleName(data.module_name);
    setDes(data.description);
    setSubmiting(true);
  };

  useEffect(() => {
    if (submiting == true) {
      addModule();
      setData();

      setSubmiting(false);
    }
  }, [submiting]);

  const setData = () => {
    setModuleName("");
    setDes("");
  };
  const moduleShow = () => {
    axios.post("http://localhost:5000/show_module").then((res) => {
      if (res?.data?.result) {
     //  console.log(res.data.result);
       setModuleData(res.data.result)
      }
    });
  };
  useEffect(() => {
    moduleShow();

    //    1 time
  }, []);
  const addModule = () => {
    
    axios
      .post("http://localhost:5000/add_module", {
        module_name: moduleName,
        description: des,
      })
      .then((res) => {
      //  console.log(res.data);
      if(res.data.message){
        alert(res.data.message) 
        
         }
         else{
          alert("module add");
          moduleShow();
          setData();
         }
       
      });

  };
  const deleteModule = (mid) => {
    axios
    .post("http://localhost:5000/delete_module", {
      mid
    })
    .then((res) => {
    //  console.log(res.data);
    if(res.data.message){
      alert(res.data.message) 
      
       }
       else{
        alert("Module Deleted Successfully");
        moduleShow();
        setData();
       }
     
    });
    
   

   
  };
  return (
    <>
      <section>
        <div className="container mt-5">
          <div className="row">
            <h1 className="text-center">Module Details</h1>
            <div className="col-6 col-lg-4 mx-auto ">
              <form>
                <div className="form-group">
                  <label htmlFor="module_name">Module Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="module_name"
                    name="module_name"
                    placeholder="Enter module name"
                    {...register("module_name", {
                      required: "Enter Module Name",
                    })}
                  />

                  <div className="errror">{errors.module_name?.message}</div>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Description"
                    {...register("description", {
                      required: "Enter Description",
                    })}
                  />

                  <div className="errror">{errors.description?.message}</div>
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  className="btn btn-primary btnsubmit text-center btnmodule"
                >
                  Submit
                </button>
              </form>
             
            </div>
            <table 
            cellPadding="0"
            cellspacing="0" 
            width="80%"
            border="0" 
            className="datatable table table-striped table-bordered mt-5 p-0">
                  <thead className="thead-dark">
                    <tr className="text-center">
                      <th>ID</th>
                      <th>Module Name</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {moduleData?.map((itm, i) => {
                      return (
                        <>
                          <tr>
                          <td>{itm.id}</td>
                            <td>{itm.module_name}</td>

                            <td>{itm.description}</td>
                          

                            <td>
                              <button
                                className="btn btn-danger btn-module"
                                onClick={()=> deleteModule(itm.id)}
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Module;
