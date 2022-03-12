import React, { useEffect } from "react";
import { Dropdown } from "react-bootstrap";

import { useHistory } from "react-router-dom";

const Navbar = () => {
  let employee_id = localStorage.getItem("employee_id");
  let menu = localStorage.getItem("menu");

//  const [refresh,setRefresh] = useState(false)
     
  const empty=()=>{
    localStorage.removeItem('employee_id');
    localStorage.removeItem('menu');
  }
  useEffect(() => {
    localStorage.setItem('menu', 'home');
  }, [])
  

  
  let history = useHistory();
  return (
    <>
      <section className="navbar-bg">
        <nav className="navbar navbar-expand-lg navbar-light ">
          <div className="container">
            <div className="col-6 col-lg-11">
            <img className="nav-img" width="50" height="50" src="./images/compony Logo.png" alt="aboutusimg" />
              <a className="navbar-brand" href="">
                Rejuvenation Technologies Employee Portal
              </a>
            </div>
            <Dropdown className="btn-drop">
            <img className="nav-img m-1" width="30" height="30" src="./images/usericon.png" alt="aboutusimg" />
              <Dropdown.Toggle variant="info" id="dropdown-basic"> 
                {employee_id}
              </Dropdown.Toggle>

              <Dropdown.Menu className="logout">
                
                <Dropdown.Item href="/" onClick={empty}>log out<i className="fas fa-sign-out-alt"></i></Dropdown.Item>
              
              </Dropdown.Menu>
            </Dropdown>

          </div>
        </nav>
      </section>
      <form className="d-flex btn-col mx-5 btns">
        <button
          className={menu==='home' ? "btn btn-secondary btn-block  btnsub active ": "btn btn-primary btn-block  btnsub deactive"
          }
          onClick={() => {
            localStorage.setItem('menu', 'home');
            history.push("/home"); 
           
              
          }}
        
        >
          Home
        </button>
        <button
         className={ menu==='profile' ? "btn btn-secondary btn-block  btnsub active ": "btn btn-primary btn-block  btnsub deactive"
        }
          onClick={() => {
            
            localStorage.setItem('menu', 'profile');
            history.push("/profile");
           
          }}
        >
          Profile
        </button>
        <button
           className={menu==='taskdetails' ? "btn btn-secondary btn-block  btnsub active ": "btn btn-primary btn-block  btnsub deactive "
          }
          onClick={() => {
            localStorage.setItem('menu', 'taskdetails');
            history.push("/taskdetails");
          }}
        >
          Time Booking
        </button>
        <button
          type="submit"
          className={menu==="leavesdetails" ? "btn btn-secondary btn-block  btnsub  active ": "btn btn-primary btn-block  btnsub deactive "
          }
          onClick={() => {
            localStorage.setItem('menu', 'leavesdetails');
            history.push("/leavesdetails");
            
          }}
        >
          Leaves
        </button>
    
      </form>
    </>
  );
};

export default Navbar;
