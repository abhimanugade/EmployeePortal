import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const TimeBookingData = () => {
  const [list, setList] = useState([]);

  const showList = () => {
    axios.post("http://localhost:5000/time_booking_data").then((res) => {
      if (res?.data?.result) {
        setList(res.data.result);
       // console.log(res.data.result);
      }
    });
  };
  useEffect(() => {
    showList();
  }, []);
  useEffect(() => {}, [list]);
  return (
    <>
      <div id="wrap">
        <div class="container">
          <h3 className="text-center mt-5">Working hours</h3>
          <table
            cellPadding="0"
            cellspacing="1"
            border="0"
            class="datatable table table-striped table-bordered"
          >
            <thead className="text-center">
              <tr>
                <th>Employee Id</th>
                <th>Date</th>
                <th>Total Hours</th>
              </tr>
            </thead>
            <tbody>
              {list?.map((itm, i) => {
                return (
                  <>
                    <tr className="text-center">
                      <td>{itm.employee_id}</td>
                      <td>{moment(itm.date).format("DD-MM-YYYY")}</td>
                      <td>{itm.total_hours}</td>
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

export default TimeBookingData;
