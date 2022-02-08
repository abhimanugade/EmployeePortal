
import React, { useState, useRef } from "react";
import { Dropdown } from "react-bootstrap";

import { useHistory } from "react-router-dom";


function AdminNavbar() {
  let history = useHistory();

  let user_name = localStorage.getItem("user_name");
  let menu = localStorage.getItem("menu");
  const empty=()=>{
    localStorage.removeItem('user_name');
    localStorage.removeItem('menu');
  
  }
  return (<>
       <section className="navbar-bg">
        <nav class="navbar navbar-expand-lg navbar-light ">
          <div class="container">
            <div className="col-6 col-lg-11">
            <img className="nav-img" width="50" height="50" src="./images/compony Logo.png" alt="aboutusimg" />
              <a class="navbar-brand" href="">
                Rejuvenation Technologies Employee Portal
              </a>
            </div>
            <Dropdown className="btn-drop">
            <img className="nav-img" width="30" height="30" src="./images/usericon.png" alt="aboutusimg" />
              <Dropdown.Toggle variant="info" id="dropdown-basic dropdown-menu-align-responsive-1" className="m-1">
                {user_name}
              </Dropdown.Toggle>

              <Dropdown.Menu className="logout-item">
                
                <Dropdown.Item href="/AdminLogin" onClick={empty} >log out<i class="fas fa-sign-out-alt"></i></Dropdown.Item>
              
              </Dropdown.Menu>
            </Dropdown>

          </div>
        </nav>
      </section>
      <form class="d-flex btn-col btns">
      <button
          type="submit"
          className={menu==='AdminHomePage' ? "btn btn-secondary btn-block btnsub ":"btn btn-primary btn-block btnsub"}
          onClick={() => {
            localStorage.setItem('menu', 'AdminHomePage');
            history.push("/AdminHomePage");
          }}
        >
        Home
        </button>
        <button
          type="submit"
          className={menu==='AddModule' ? "btn btn-secondary btn-block btnsub ":"btn btn-primary btn-block btnsub"}
          onClick={() => {
            localStorage.setItem('menu', 'AddModule');
            history.push("/AddModule");
          }}
        >
          Add Module
        </button>
        <button
          type="submit"
          className={menu==='EmployeeList' ? "btn btn-secondary btn-block btnsub ":"btn btn-primary btn-block btnsub"}
          onClick={() => {
            localStorage.setItem('menu', 'EmployeeList');
            history.push("/EmployeeList");
          }}
        >
          Employee List
        </button>
        <button
          type="submit"
          className={menu==='LeaveStatusPage' ? "btn btn-secondary btn-block btnsub ":"btn btn-primary btn-block btnsub"}
          onClick={() => {
            localStorage.setItem('menu', 'LeaveStatusPage');
            
            history.push("/LeaveStatusPage");
          }}
        >
          Leave Applications
        </button>
        <button
          type="submit"
          className={menu==='TimeBookingList' ? "btn btn-secondary btn-block btnsub ":"btn btn-primary btn-block btnsub"}
          onClick={() => {
            localStorage.setItem('menu', 'TimeBookingList');
            
            history.push("/TimeBookingList");
          }}
        >
          Time Booking
        </button>
        <button
          type="submit"
          className={menu==='AssignLeavePage' ? "btn btn-secondary btn-block btnsub ":"btn btn-primary btn-block btnsub"}
          onClick={() => {
            localStorage.setItem('menu', 'AssignLeavePage');
            
            history.push("/AssignLeavePage");
          }}
        >
          Assign Leaves
        </button>
      </form>
     
  </>)
  
  ;
}

export default AdminNavbar;
