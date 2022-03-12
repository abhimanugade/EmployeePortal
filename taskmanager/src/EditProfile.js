import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { useForm } from "react-hook-form";

const EditProfile = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

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

  const [submiting, setSubmiting] = useState(false);

  const [file, setFile] = React.useState(null);

  const fileToBase64 = (file, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(null, reader.result);
    };
    reader.onerror = function (error) {
      cb(error, null);
    };
  };

  const fileHandler = (e) => {
    fileToBase64(e.target.files[0], (err, result) => {
      if (result) {
        console.log(result);
        setProfilePhoto(result);
        setFile(e.target.files[0]);
        //console.log(profilePhoto);
      }
    });
  };

  let history = useHistory();
  let employee_id = localStorage.getItem("employee_id");

  const profile = () => {
    let base64String;
    axios
      .post("http://localhost:5000/profile_data", { employee_id })
      .then((res) => {
        if (res?.data?.result) {
          setProfileData(res.data.result[0]);
          console.log(res.data.result);
          //console.log( moment(res.data.result[0].date_of_joining).format('MM-DD-YYYY') );

          let bdate = moment(res.data.result[0].dob).format("YYYY-MM-DD");

          setValue("fname", res.data.result[0].first_name, {
            shouldValidate: true,
          });
          setValue("last_name", res.data.result[0].last_name, {
            shouldValidate: true,
          });
          setValue("address1", res.data.result[0].address1, {
            shouldValidate: true,
          });
          setValue("address2", res.data.result[0].address2, {
            shouldValidate: true,
          });
          setValue("gender", res.data.result[0].gender, {
            shouldValidate: true,
          });
          setValue("contact_no", res.data.result[0].contact_no, {
            shouldValidate: true,
          });
          setValue("marital_status", res.data.result[0].marital_status, {
            shouldValidate: true,
          });
          setDob(bdate);
          setValue("email_id", res.data.result[0].email_id, {
            shouldValidate: true,
          });
          setValue("qualification", res.data.result[0].highest_qualification, {
            shouldValidate: true,
          });
          setValue("instituited", res.data.result[0].university, {
            shouldValidate: true,
          });
          setValue("designation", res.data.result[0].designation, {
            shouldValidate: true,
          });
          setDop(
            moment(res.data.result[0].date_of_passing).format("YYYY-MM-DD")
          );
          setDoj(
            moment(res.data.result[0].date_of_joining).format("YYYY-MM-DD")
          );

          // console.log(res.data.result[0].profile_photo);
          base64String = btoa(
            String.fromCharCode(
              ...new Uint8Array(res.data.result[0].profile_photo.data)
            )
          );
          console.log(base64String);
          setProfilePhoto(base64String);
        }
      });
  };

  const onSubmit = (data) => {
    //alert(JSON.stringify(data));
    setFName(data.fname);
    setLName(data.last_name);
    setAddress1(data.address1);
    setAddress2(data.address2);
    setGender(data.gender);
    setContactNo(data.contact_no);
    setMaritalStatus(data.marital_status);
    setEmailId(data.email_id);
    setQulification(data.qualification);
    setUniversity(data.instituited);
    setDesignation(data.designation);
    setSubmiting(true);
  };
  useEffect(() => {
    if (submiting == true) {
      editProfile();

      setSubmiting(false);
    }
  }, [submiting]);

  const editProfile = () => {
    // event.preventDefault();
    console.log(profilePhoto);

    axios
      .post("http://localhost:5000/edit_profile", {
        fName,
        lName,
        address1,
        address2,
        gender,
        contactNo,
        dob,
        maritalStatus,
        emailId,
        qulification,
        university,
        dop,
        doj,
        designation,
        profilePhoto,
        employee_id,
      })
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
        } else if (res.data.err) {
          //  alert(JSON.stringify(res.data.err.sqlMessage));
          console.log(res.data.err);
          //history.push('/profile')
        } else {
          alert("Profile Details Edit successfully");
          console.log(profilePhoto);
          //history.push("/profile");
        }
      })
      .catch(() => {
        alert("Profile Details Not Edited");
      });
  };
  useEffect(() => {
    profile();
  }, []);
  useEffect(() => {
    console.log(profileData);
  }, [profileData]);

  return (
    <>
      <div class="container rounded profile-section mb-5">
        <div class="row">
          <div className="col-lg-3 col-12">
            <div class="">
              <img
                class="rounded-circle mt-5"
                width="200px"
                src={`data:image/jpeg;base64,${profilePhoto}`}
                alt=""
              />
            </div>
            <div class="filetype mx-1">
              <label htmlFor="formFile" class="form-label">
                Select Profile Photo
              </label>
              <input
                class="form-control filetype"
                type="file"
                id="formFile"
                onChange={fileHandler}
              />
            </div>
          </div>
          <div className="col-lg-9 col-12 edit-button">
            <button
              type="button"
              class="btn btn-primary float-end m-1 "
              // value={profilePhoto}
              onClick={handleSubmit(onSubmit)}
            >
              Save Changes
            </button>
            <button
              type="button"
              class="btn btn-danger float-end m-1"
              onClick={() => {
                history.push("/profile");
              }}
            >
              Cancel
            </button>
            <br />
            <h5 className="edit-profile-h5">Personal Information</h5>
            <div className="row mt-3">
              <div className="col-12 col-lg-4">
                <label htmlFor="name">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="fname"
                  name="name"
                  placeholder=" First name"
                  autocomplete="off"
                  //value={fName}
                  // onChange={(e) => {
                  //  setFName(e.target.value);
                  // }}
                  {...register("fname", {
                    required: "Enter First Name",
                  })}
                />
                <div className="errror">{errors.fname?.message}</div>
              </div>
              <div className="col-12 col-lg-4">
                <label htmlFor="name">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="last_name"
                  name="last_name"
                  placeholder="Last name"
                  autocomplete="off"
                  // value={lName}
                  // onChange={(e) => {
                  //   setLName(e.target.value);
                  // }}
                  {...register("last_name", {
                    required: "Enter Last Name",
                  })}
                />
                <div className="errror">{errors.last_name?.message}</div>
              </div>
              <div className="col-12 col-lg-4">
                <label htmlFor="address1">Address Line 1</label>
                <input
                  type="text"
                  className="form-control"
                  id="address1"
                  name="address1"
                  placeholder="Enter Address "
                  autocomplete="off"
                  {...register("address1", {
                    required: "Enter Address",
                  })}
                />
                <div className="errror">{errors.address1?.message}</div>
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
                  placeholder="Enter Address"
                  autocomplete="off"
                  {...register("address2", {
                    required: "Enter Address",
                  })}
                />
                <div className="errror">{errors.address2?.message}</div>
              </div>
              <div className="col-12 col-lg-4">
                <label htmlfor="module">Gender</label>
                <select
                  id="gender"
                  className="form-control"
                  {...register("gender", {
                    required: "Select Gender",
                  })}
                >
                  <>
                    <option value="" selected>
                      Select Gender...
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </>
                </select>
                <div className="errror">{errors.gender?.message}</div>
              </div>
              <div className="col-12 col-lg-4">
                <label htmlFor="contact_no">Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="contact_no"
                  name="contact_no"
                  placeholder="Enter Contact No "
                  autocomplete="off"
                  {...register("contact_no", {
                    required: "Enter Contact Number ",
                    maxLength: {
                      value: 10,
                      message: "Enter Valid Contact Number",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Enter Only Number",
                    },
                  })}
                />
                <div className="errror">{errors.contact_no?.message}</div>
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
                  placeholder="Enter Birth Day"
                  autocomplete="off"
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                />
              </div>
              <div className="col-12 col-lg-4">
                <label htmlFor="marital_status">Marital Status</label>
                <select
                  id="marital_status"
                  className="form-control"
                  {...register("marital_status", {
                    required: "Select Marital Status",
                  })}
                >
                  <>
                    <option value="" selected>
                      Select Marital Status
                    </option>
                    <option value="Married">Married</option>
                    <option value="UnMarried">UnMarried</option>
                  </>
                </select>
                <div className="errror">{errors.marital_status?.message}</div>
              </div>
              <div className="col-12 col-lg-4">
                <label htmlFor="email_id">Email ID</label>
                <input
                  type="email"
                  className="form-control"
                  id="email_id"
                  name="email_id"
                  placeholder="Enter Email Id "
                  autocomplete="off"
                  {...register("email_id", {
                    required: "Enter Email Id ",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  })}
                />
                <div className="errror">{errors.email_id?.message}</div>
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
                  name="qulification_id"
                  placeholder="Enter Qulification"
                  autocomplete="off"
                  {...register("qualification", {
                    required: "Enter Highest Qulification ",
                  })}
                />
                <div className="errror">{errors.qulification?.message}</div>
              </div>
              <div className="col-12 col-lg-4">
                <label htmlfor="Instituite">Instituited / University</label>
                <input
                  type="text"
                  className="form-control"
                  id="instituited"
                  name="instituited"
                  placeholder="Enter Instituited / University "
                  autocomplete="off"
                  {...register("instituited", {
                    required: "Enter Instituited / University",
                  })}
                />
                <div className="errror">{errors.instituited?.message}</div>
              </div>
              <div className="col-12 col-lg-4">
                <label htmlFor="email_id">Date of Passing</label>
                <input
                  type="date"
                  className="form-control"
                  id="email_id"
                  name="email_id"
                  placeholder="Enter email Id "
                  autocomplete="off"
                  value={dop}
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
                  placeholder="Enter Date of Joining  "
                  autocomplete="off"
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
                  placeholder="Enter designation "
                  autocomplete="off"
                  {...register("designation", {
                    required: "Enter Designation ",
                  })}
                />
                <div className="errror">{errors.designation?.message}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
