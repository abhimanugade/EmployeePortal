import React from "react";



import {BrowserRouter as Router,Route, Switch  } from 'react-router-dom';
import AddTaskDetails from "./pages/AddTaskDetails";
import Navbar from "./Navbar";
import AddLeavesDetails from "./pages/AddLeaveDetails";
import HomePage from "./pages/HomePage";
import EmployeeProfile from "./pages/EmployeeProfile";
import EditEmpProfile from "./pages/EditEmpProfile";

import AdminLogin from "./AdminLogin";
import AdminNavbar from "./AdminNavbar";
import AddModule from "./pages/AddModule";
import AdminHomePage from "./pages/AdminHomePage";
import LeaveStatusPage from "./pages/LeaveStatusPage";
import TimeBookingList from "./pages/TimeBookingList";



import Login from "./Login";
import Error from './pages/Error';
import EmployeeMaster from "./EmployeeMaster";
import  EmployeeList from './pages/EmployeeList';
import AssignLeavePage from './pages/AssignLeavePage';


function App() {
   
  return (
   <Router>
    
    <Switch>
       <Route exact path="/" component={Login}></Route>
        <Route path="/taskdetails" component={AddTaskDetails}></Route>
        <Route path="/leavesdetails" component={AddLeavesDetails}></Route>
       <Route path="/navbar" component={Navbar} ></Route>
        <Route path="/home" component={HomePage}></Route>
        <Route path="/profile" component={EmployeeProfile}></Route>
        <Route path="/edit_profile" component={EditEmpProfile}></Route>
        <Route path="/register" component={EmployeeMaster}></Route>
        <Route path="/AdminLogin" component={AdminLogin}></Route>
        <Route path="/AdminNavbar" component={AdminNavbar}></Route>
        <Route path="/AddModule" component={AddModule}></Route>
        <Route path="/EmployeeList" component={EmployeeList}></Route>
        <Route path="/AdminHomePage" component={AdminHomePage}></Route>
        <Route path="/LeaveStatusPage" component={LeaveStatusPage}></Route>
        <Route path="/TimeBookingList" component={TimeBookingList}></Route>
        <Route path="/AssignLeavePage" component={AssignLeavePage}></Route>
       
       
       
        
        <Route component={Error}></Route>
     </Switch>
  
   </Router>
  );
}

export default App;
