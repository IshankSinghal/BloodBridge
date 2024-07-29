import { userForgotPass, userLogin, userRegister, userResetPassword } from "../redux/features/auth/authActions";
import store from "../redux/store";
import { ToastContainer, toast } from "react-toastify";
export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      return ( toast.error("Please Provide All Fields", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }))
      
      // alert("Please Privde All Feilds");
      

    }
    store.dispatch(userLogin({ email, password, role }));
  } catch (error) {
    console.log(error);
  }
};

export const handleRegister = (
  e,
  name,
  role,
  email,
  password,
  phone,
  organisationName,
  address,
  hospitalName,
  website,userBloodGroup
) => {
  e.preventDefault();
  try {
    store.dispatch(
      userRegister({
        name,
        role,
        email,
        password,
        phone,
        organisationName,
        address,
        hospitalName,
        website,userBloodGroup
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const handleForgotPass = (e, email) => {
  e.preventDefault();
  try {
    if ( !email ) {
      return ( toast.error("Please Provide  registered email", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }))
      
      // alert("Please Privde All Feilds");
      

    }
    store.dispatch(userForgotPass({ email }));
  } catch (error) {
    console.log(error);
  }
};



export const handleResetPassword = (e, token,email,password) => {
  e.preventDefault();
  try {
    if ( !email || !password ||  !token) {
      return ( toast.error("Please Provide  all the details ", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }))
      
      // alert("Please Privde All Feilds");
      

    }
    store.dispatch(userResetPassword({ token,email,password }))
  } catch (error) {
    console.log(error);
  }
};

