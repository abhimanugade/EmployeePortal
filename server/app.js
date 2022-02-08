const express = require("express");
const app = express();
const mysql = require("mysql");
app.use(express.json());

const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

var cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "user_id",
    secret: "subscrible",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "taskmanager",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/", (req, res) => {
  res.send("hello world");
});

//-----------Employee ID Exist--------------
function checkEmpID(req, res, next) {
  var employee_id = req.body.employee_id;
  db.query(
    "SELECT * FROM employee_master WHERE employee_id=?",
    [employee_id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        if (result.length > 0) {
          res.send({ message: "Employee Id Exits" });
        } else {
          next();
        }
      }
    }
  );
}
//----------emp Exist-----------

function checkEmpExist(req, res, next) {
  var employee_id = req.body.employee_id;
  db.query(
    "SELECT * FROM employee_master WHERE employee_id=?",
    [employee_id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
       console.log(result.length);
        if (result.length > 0) {
        console.log(result);
         next();
        } 
        else {
         
          res.send({ message: "Employee Not Exits" });
        }
      }
    }
  );
}
//-----------email ID Exist--------------
function checkEmailID(req, res, next) {
  var email_id = req.body.email_id;
  db.query(
    "SELECT * FROM employee_master WHERE email_id=?",
    [email_id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        if (result.length > 0) {
          res.send({ message: "Email Id Exits" });
        } else {
          next();
        }
      }
    }
  );
}
//-----------Module Exist--------------
function checkModule(req, res, next) {
  var module_name = req.body.module_name;
  db.query(
    "SELECT * FROM module WHERE module_name=?",
    [module_name],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        if (result.length > 0) {
          res.send({ message: "Module Already Exits" });
        } else {
          next();
        }
      }
    }
  );
}

// -------------add employee----------------

app.post("/employee_master", checkEmpID, checkEmailID, (req, res) => {
  const employee_id = req.body.employee_id;
  const email_id = req.body.email_id;
  const password = req.body.password;
  const cpassword = req.body.cpassword;

  db.query(
    "INSERT INTO employee_master(employee_id,email_id,password,cpassword) VALUES (?,?,?,?)",
    [employee_id, email_id, password, cpassword],
    (err, result) => {
      if (err) throw err;
      res.send("success");
    }
  );

  db.query(
    "INSERT INTO employee_profile(employee_id,first_name,last_name,address1,address2,gender,contact_no,dob,marital_status,email_id,highest_qualification,university,date_of_passing,date_of_joining,designation,profile_photo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      employee_id,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      email_id,
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    (err, result) => {
      if (err) throw err;
      //res.send("success");
    }
  );

  db.query(
    "INSERT INTO assign_leave(employee_id,total_leave,remain_leave) VALUES (?,?,?)",
    [
      employee_id,
      "0",
      "0",
     
    ],
    (err, result) => {
      if (err) throw err;
      //res.send("success");
    }
  );

});
//-------------delete Emp Data---------------
app.post("/deleteEmpData", (req, res) => {
  const employee_id = req.body.employee_id;
  db.query("DELETE  FROM employee_profile WHERE employee_id=?", [employee_id], (err, result) => {
    if (err) throw err;
 //   console.log(result);
    res.send({ result });
  });
});


// -------------add module----------------

app.post("/add_module",checkModule, (req, res) => {
  const module_name = req.body.module_name;
  const description = req.body.description;

  db.query(
    "INSERT INTO module(module_name,description) VALUES (?,?)",
    [module_name, description],
    (err, result) => {
      if (err) throw err;
      res.send("success");
    }
  );
});

//--------------show module-----------

app.post("/show_module", (req, res) => {
  db.query("SELECT * FROM module", (err, result) => {
    //if (err) throw err;
    console.log(result);
    res.send({ result });
  });
});

//--------------delete module------------

app.post("/delete_module", (req, res) => {
  const id = req.body.mid;
  db.query("DELETE  FROM module WHERE id=?", [id], (err, result) => {
    if (err) throw err;
 //   console.log(result);
    res.send({ result });
  });
});

//--------------add module details--------------

app.post("/time_booking", (req, res) => {
  var tableData = req.body.oldData;
  var date = req.body.date;
  var totalHours = req.body.totalHours;
  var employee_id = req.body.employee_id;

  console.log(tableData);
  var l = tableData.length;
  console.log(l);
  for (let i = 0; i < l; i++) {
    db.query(
      "INSERT INTO task_details(employee_id, date, module_id, hours, comment, total_hours) VALUES (?,?,?,?,?,?)",
      [
        employee_id,
        date,
        tableData[i].module_id,
        tableData[i].hours,
        tableData[i].comment,
        totalHours,
      ],
      (err, result) => {
        if (err) throw err;
        //console.log(result);
        res.send(result[i]);
      }
    );
  }
});

//--------------add leave details--------------

app.post("/add_leave_details", (req, res) => {
  const employee_id = req.body.employee_id;
  const date = req.body.date;
  const leave_type = req.body.leave_type;
  const leave_days = req.body.leave_days;

  db.query(
    "INSERT INTO leave_details(employee_id,date,leave_type,leave_days,status) VALUES (?,?,?,?,'Pending')",
    [employee_id, date, leave_type, leave_days],
    (err, result) => {
      if (err) throw err;
     // console.log(result);
      res.send({ result });
    }
  );
});

app.post("/login", (req, res) => {
  const employee_id = req.body.employee_id;
  const password = req.body.password;
  db.query(
    "SELECT * FROM employee_master WHERE employee_id=? AND password=?",
    [employee_id, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        if (result.length > 0) {
          req.session.result = result;
         // console.log(req.session.result);
          res.send({ result });
        } else {
          res.send({ message: "wrong username password" });
        }
      }
    }
  );
});

app.post("/add_profile", (req, res) => {
  const userId = req.body.userId;
  const fName = req.body.fName;
  const lName = req.body.lName;
  const address1 = req.body.address1;
  const address2 = req.body.address2;
  const gender = req.body.gender;
  const contactNo = req.body.contactNo;
  const dob = req.body.dob;
  const maritalStatus = req.body.maritalStatus;
  const emailId = req.body.emailId;
  const qulification = req.body.qulification;
  const university = req.body.university;
  const dop = req.body.dop;
  const doj = req.body.doj;
  const designation = req.body.designation;
  const profilePhoto = req.body.profilePhoto;

  db.query(
    "INSERT INTO employee_profile(user_id,first_name,last_name,address1,address2,gender,contact_no,dob,marital_status,email_id,highest_qualification,university,date_of_passing,date_of_joining,designation,profile_photo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      userId,
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
    ],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        if (result.length > 0) {
        //  console.log(result);
          res.send({ result });
        } else {
          res.send({ message: "Profile Not Saved" });
        }
      }
    }
  );
});

//fetch data

app.post("/profile_data", (req, res) => {
  const employee_id = req.body.employee_id;
  db.query(
    "SELECT * FROM employee_profile where employee_id=?",
    employee_id,
    (err, result) => {
    //  console.log(result);
      res.send({ result });
    }
  );
});

//edit profile

app.post("/edit_profile", (req, res) => {
  const employee_id = req.body.employee_id;
  const fName = req.body.fName;
  const lName = req.body.lName;
  const address1 = req.body.address1;
  const address2 = req.body.address2;
  const gender = req.body.gender;
  const contactNo = req.body.contactNo;
  const dob = req.body.dob;
  const maritalStatus = req.body.maritalStatus;
  const emailId = req.body.emailId;
  const qulification = req.body.qulification;
  const university = req.body.university;
  const dop = req.body.dop;
  const doj = req.body.doj;
  const designation = req.body.designation;
  const profilePhoto = req.body.profilePhoto;

  db.query(
    "UPDATE employee_profile SET first_name=?,last_name=?,address1=?,address2=?,gender=?,contact_no=?,dob=?,marital_status=?,email_id=?,highest_qualification=?,university=?,date_of_passing=?,date_of_joining=?,designation=?,profile_photo=? WHERE employee_id=?",
    [
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
    ],
    (err, result) => {
     // console.log(result);

      if (err) {
        res.send({ err: err });
      } else if (result) {
        console.log(result);
        res.send({ result });
      } else {
        res.send({ message: "Profile Not Edited" });
      }
    }
  );
});

//admin login
app.post("/admin_login", (req, res) => {
  const user_name = req.body.user_name;
  const password = req.body.password;
  db.query(
    "SELECT * FROM admin_login WHERE user_name=? AND password=?",
    [user_name, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        if (result.length > 0) {
          res.send({ result });
        } else {
          res.send({ message: "wrong username password" });
        }
      }
    }
  );
});
//----------------------Employee List---------------------
app.post("/employee_list", (req, res) => {
  db.query("SELECT * FROM employee_profile ORDER BY employee_id DESC", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
     // console.log(result);
      res.send({ result });
    }
  });
});

//-----------------all Leaves------------------

app.post("/leave_status", (req, res) => {
  db.query(
    "SELECT * FROM leave_details WHERE status='Pending' ORDER BY date DESC",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        console.log(result);
        res.send({ result });
      }
    }
  );
});
app.post("/emp_leave_status", (req, res) => {
  const employee_id = req.body.employee_id;
  db.query(
    "SELECT * FROM leave_details WHERE status='Pending' AND employee_id=? ORDER BY date DESC " ,[employee_id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
       // console.log(result);
        res.send({ result });
      }
    }
  );
});

app.post("/approve_leave_status", (req, res) => {
  const employee_id = req.body.employee_id;
  const leave_days=req.body.leave_days;
  db.query(
    "UPDATE leave_details SET status='Approved' WHERE employee_id=?",
    [employee_id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
       // console.log(result);
        res.send({ result });
      }
    }
  );
  db.query(
    "UPDATE assign_leave SET remain_leave=remain_leave - ? WHERE employee_id=?",
    [leave_days,employee_id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
       // console.log(result);
        res.send({ result });
      }
    }
  );

});

app.post("/time_booking_data", (req, res) => {
  db.query("SELECT * FROM task_details group by date Desc ", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      //console.log(result);
      res.send({ result });
    }
  });
});

app.post("/assignLeave", checkEmpExist,(req, res) => {
  const employee_id = req.body.employee_id;
  const leave_days = req.body.leave_days;

  db.query(
    "UPDATE assign_leave SET total_leave=total_leave + ?,remain_leave=remain_leave + ? WHERE employee_id=?",
    [leave_days,leave_days,employee_id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
       // console.log(result);
        res.send({ result });
      }
    }
  );
});

app.post("/leaves", (req, res) => {
  const employee_id = req.body.employee_id;
  db.query("SELECT * FROM assign_leave WHERE employee_id=?",[employee_id], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
   
      res.send({ result });
    }
  });
});

app.listen(5000, () => {
  console.log("server is running at port no 5000");
});
