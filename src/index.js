import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./styles.css";

function App() {
  const [resp, setData] = useState({ data: null, repos: null });

  useEffect(() => {
    const fetchData = async () => {
      const apiEmployeePrefixUrl = 'https://api.hatchways.io/assessment/workers/'
      
      const respWorkOrders = await axios(
        `https://api.hatchways.io/assessment/work_orders`
      );
        let employeeIds = [];
        let employeeAxiosRequests = [];
        let employeeList = [];
        respWorkOrders.data.orders.map((workorder,index)=>{
              if(employeeIds.includes(workorder.workerId)===false)
              {
                  employeeIds.push(workorder.workerId);
              }
        });
          employeeIds.map((employeeId,index) => {
              employeeAxiosRequests.push(axios.get(apiEmployeePrefixUrl.concat(employeeId)));
          });

          Promise.all(employeeAxiosRequests)
          .then((employeeRsponses) => {
              employeeRsponses.map((employeeResponse, index) =>{
                  employeeList.push(employeeResponse);
              });
          });

      setData({ workOrders: respWorkOrders.data.orders, employees: employeeList });
    };
    fetchData();
  }, []);

 // console.log("render");
  if (resp.workOrders) {
    console.log("d", resp.workOrders, resp.employees);
  }

  return <div><h1>Helhssddslos</h1></div>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
