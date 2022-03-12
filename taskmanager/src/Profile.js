import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import moment from "moment";

const Profile = () => {
  const [profileData, setProfileData] = useState([]);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [gender, setGender] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [dob, setDob] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [emailId, setEmailId] = useState("");
  const [qulification, setQulification] = useState("");
  const [university, setUniversity] = useState("");
  const [dop, setDop] = useState("");
  const [doj, setDoj] = useState("");
  const [designation, setDesignation] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  let history = useHistory();
  let employee_id = localStorage.getItem("employee_id");

  let base64String;

  const profile = () => {
    axios.post("http://localhost:5000/profile_data", { employee_id }).then((res) => {
      if (res?.data?.result) {
        setProfileData(res.data.result[0]);
     //   console.log(res.data.result);
        //console.log( moment(res.data.result[0].date_of_joining).format('MM-DD-YYYY') );
        let bdate = moment(res.data.result[0].dob).format("YYYY-MM-DD");
        // console.log(bdate);

        setFName(res.data.result[0].first_name);
        setLName(res.data.result[0].last_name);
        setAddress1(res.data.result[0].address1);
        setAddress2(res.data.result[0].address2);
        setGender(res.data.result[0].gender);
        setDob(bdate);
        setContactNo(res.data.result[0].contact_no);
        setMaritalStatus(res.data.result[0].marital_status);
        setEmailId(res.data.result[0].email_id);
        setQulification(res.data.result[0].highest_qualification);
        setUniversity(res.data.result[0].university);
        setDop(moment(res.data.result[0].date_of_passing).format("YYYY-MM-DD"));
        setDoj(moment(res.data.result[0].date_of_joining).format("YYYY-MM-DD"));
        setDesignation(res.data.result[0].designation);
        console.log(res.data.result[0].profile_photo);

        base64String = btoa(String.fromCharCode(...new Uint8Array(res.data.result[0].profile_photo.data)))
      //   console.log(base64String);  
        setProfilePhoto(base64String); 
      } 
    });
  };

  useEffect(() => {
    profile();
  }, []);
  useEffect(() => {
  
  }, [profileData]);

 // console.log(dob);
  return (
    <>

      <div className="container profile-section mb-5">
        <div className="row">
          <div className="col-lg-3 col-12">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-cenroundedter text-center">
                 <img
                  className="rounded-circle mt-5"
                  width="200px"
                  src={`data:image/jpeg;base64,${profilePhoto}`}
                  alt="" 
                 
                /> 

              </div>
            </div>
          </div>

          <div className="col-lg-9 col-12">
            <button
              type="button"
              className="btn btn-danger float-end"
              onClick={() => {
                history.push("/edit_profile");
              }}
            >
              Edit
            </button>
            <br />
            <h5>Personal Information</h5>
            <div className="row mt-3">
              <div className="col-12 col-lg-4">
                <label htmlFor="name">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                 autoComplete="off"
                  disabled
                  value={fName}
                  onChange={(e) => {
                    setFName(e.target.value);
                  }}
                />
              </div>
              <div className="col-12 col-lg-4">
                <label htmlFor="name">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="last_name"
                  name="last_name"
                 autoComplete="off"
                  disabled
                  value={lName}
                  onChange={(e) => {
                    setLName(e.target.value);
                  }}
                />
              </div>
              <div className="col-12 col-lg-4">
                <label htmlFor="address1">Address Line 1</label>
                <input
                  type="text"
                  className="form-control"
                  id="address1"
                  name="address1"
                 autoComplete="off"
                  disabled
                  value={address1}
                  onChange={(e) => {
                    setAddress1(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 col-lg-4">
                <label htmlFor="address2">Address Line 2</label>
                <input
                  type="text"
                  className="form-control"
                  id="address2"
                  name="address2"
                 autoComplete="off"
                  disabled
                  value={address2}
                  onChange={(e) => {
                    setAddress2(e.target.value);
                  }}
                />
              </div>
              <div className="col-12 col-lg-4">
                <label htmlfor="module">Gender</label>
                <select
                  id="gender"
                  className="form-control"
                  disabled
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  <>
                    <option selected>Select Gender...</option>
                    <option>Male</option>
                    <option>Female</option>
                  </>
                </select>
              </div>
              <div className="col-12 col-lg-4">
                <label htmlFor="contact_no">Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="contact_no"
                  name="contact_no"
                 autoComplete="off"
                  disabled
                  value={contactNo}
                  onChange={(e) => {
                    setContactNo(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 col-lg-4">
                <label htmlFor="pin_code">Date of Birth</label>
                <input
                  type="date"
                  min="1997-01-01"
                  max="2030-12-31"
                  className="form-control"
                  id="dob"
                  name="dob"
                 autoComplete="off"
                  disabled
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                />
              </div>

              <div className="col-12 col-lg-4">
                <label htmlFor="contact_no">Marital Status</label>
                <select
                  id="gender"
                  className="form-control"
                  disabled
                  value={maritalStatus}
                  onChange={(e) => {
                    setMaritalStatus(e.target.value);
                  }}
                >
                  <>
                    <option selected>Select Marital Status</option>
                    <option>Married</option>
                    <option>UnMarried</option>
                  </>
                </select>
              </div>
              <div className="col-12 col-lg-4">
                <label htmlFor="email_id">Email ID</label>
                <input
                  type="email"
                  className="form-control"
                  id="email_id"
                  name="email_id"
                 autoComplete="off"
                  disabled
                  value={emailId}
                  onChange={(e) => {
                    setEmailId(e.target.value);
                  }}
                />
              </div>
            </div>

            <h5 className="mt-4">Educational Information</h5>
            <div className="row mt-3">
              <div className="col-12 col-lg-4">
                <label htmlFor="qulification">Highest Qualification</label>
                <input
                  type="text"
                  className="form-control"
                  id="qulification"
                  name="qulification"
                 autoComplete="off"
                  disabled
                  value={qulification}
                  onChange={(e) => {
                    setQulification(e.target.value);
                  }}
                />
              </div>
              <div className="col-12 col-lg-4">
                <label htmlfor="Instituite">Instituited / University</label>
                <input
                  type="text"
                  className="form-control"
                  id="instituited"
                  name="instituited"
                 autoComplete="off"
                  value={university}
                  disabled
                  onChange={(e) => {
                    setUniversity(e.target.value);
                  }}
                />
              </div>
              <div className="col-12 col-lg-4">
                <label htmlFor="email_id">Date of Passing</label>
                <input
                  type="date"
                  className="form-control"
                  id="dop"
                  name="dop"
                 autoComplete="off"
                  value={dop}
                  disabled
                  onChange={(e) => {
                    setDop(e.target.value);
                  }}
                />
              </div>
            </div>

            <h5 className="mt-4">Employment details</h5>
            <div className="row mt-3">
              <div className="col-12 col-lg-6">
                <label htmlFor="email_id"> Date of Joining </label>
                <input
                  type="date"
                  className="form-control"
                  id="email_id"
                  name="email_id"
                 autoComplete="off"
                  disabled
                  value={doj}
                  onChange={(e) => {
                    setDoj(e.target.value);
                  }}
                />
              </div>
              <div className="col-12 col-lg-6">
                <label htmlfor="marks">Designation</label>
                <input
                  type="text"
                  className="form-control"
                  id="designation"
                  name="designation"
                 autoComplete="off"
                  disabled
                  value={designation}
                  onChange={(e) => {
                    setDesignation(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
