import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-felx flex-column mt-4">
          <h1>
            Welcome  <i style={{color: '#2d3282'}}className="">{user?.name}</i>
          </h1>
          <h3>Haemunity </h3>
          <hr />
          <p>
            "Welcome to the lifeline of humanity – the Blood Bank App. Your go-to platform for
            managing and tracking blood donations, saving lives one pint at a time. Join us in this
            noble mission of giving the gift of life.”<br></br>
            In a world where every drop counts, our Blood Bank App serves as a beacon of hope
            and solidarity. Seamlessly bridging the gap between donors and recipients, our
            platform revolutionizes the way blood donation is managed and tracked. With just a
            few taps, hospitals, organizations, and donors can effortlessly keep track of their
            donations, ensuring efficient inventory management and timely access to blood
            when needed the most.<br></br>
            Join our community of altruistic souls, where every donation is a testament to the
            power of humanity. Together, let's make a difference and ensure that no one ever
            faces a shortage of the precious gift of life.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
