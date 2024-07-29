import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import API from "../services/API";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  //get function
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);
  return (
    <Layout style={{height: "300px",
      overflowY: "scroll"}}>
      {user?.role === "admin" && navigate("/admin")}
      {user?.role === "donar" && navigate("/orgnaisation")}
      {error && <span>{  toast.error(error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="container" >
            <h4
              className="ms-4"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              style={{ cursor: "pointer" }}
            >
            
             <i className ="fa-solid fa-plus  py-4 " style={{ color:"#2d3282",padding:2}}></i>
            
             
              <span className="mx-2">Add Inventory</span>
            </h4>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
              <div style={{height: "400px",
      overflowY: "scroll"}}>

             
            <table className="table " >
              <thead>
                <tr>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Inventory Type</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Donor Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Time & Date</th>

                </tr>
              </thead>
              <tbody>
               { console.log("Data",data)}
                {data?.map((record) => (
                 
                  <tr key={record._id}>
                    
                    <td>{record.bloodGroup}</td>
                    <td>{record.inventoryType}</td>
                    <td>{record.quantity} (ML)</td>
                    <td>{record.email}</td>
                    {<td>{record.donar?.phone?record.donar?.phone:record.hospital?.phone}</td>}
                    <td>
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>

            <Modal />
          </div>
        </>
      )}
    </Layout>
  );
};

export default HomePage;
