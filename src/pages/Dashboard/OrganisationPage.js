import React, { useEffect, useState } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import moment from "moment";
import { useSelector } from "react-redux";
import API from "../../services/API";

const OrganisationPage = () => {
  // get current user
  const { user } = useSelector((state) => state.auth);
  console.log("user",user)
  const [data, setData] = useState([]);
  //find org records
  const getOrg = async () => {
    try {
      if (user?.role === "donar") {
        // console.log("userid",user?._id)
        const { data } = await API.get("/inventory/get-orgnaisation", {
          userId: user?._id// Sending userId in the request body
        });
          // console.log(data,"hey");
         
        if (data?.success) {
          setData(data?.organisations);
        }
      }
      else if (user?.role === "hospital") {
        const { data } = await API.get(
          "/inventory/get-orgnaisation-for-hospital", {
            userId: user?._id // Sending userId in the request body
          }
        );
          console.log(data,"hi hopital");
        if (data?.success) {
          setData(data?.organisations);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrg();
  }, [user]);

  return (
    <Layout>
      <table className="table mt-4 ">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              {user?.role==="donar" && 
              <td>{record.organisationName?record.organisationName:record.hospitalName}</td>}
            {user?.role!=="donar" && 
              <td>{record.organisationName}</td>}
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{record.address}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default OrganisationPage;
