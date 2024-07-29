import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleForgotPass, handleLogin, handleRegister, handleResetPassword } from "../../../services/authService";
import { useParams } from 'react-router-dom';
const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [oldpassword, setOldPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [userBloodGroup,setUserBloodGroup]=useState("")
  console.log(role,"user role")
  const {token}=useParams()
  return (
    <div>
      <form
        onSubmit={(e) => {
          if (formType === "login")
            return handleLogin(e, email, password, role);
          else  if (formType === "ResetPassword")
            return handleResetPassword(e, token,email,password);
          else if (formType === "register")
            return handleRegister(
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
            );
            else if(formType==="ForgotPassword")
              return handleForgotPass(e, email)
            
        }}
      >
        <h2 className="text-center">{formTitle}</h2>
        <hr />
        <div className="d-flex mb-3">
        {formType!=="ForgotPassword" && formType!=="ResetPassword" && <div className="form-check">
            <div><input
              type="radio"
              className="form-check-input"
              name="role"
              id="donarRadio"
              value={"donar"}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label htmlFor="adminRadio" className="form-check-label">
              Donor
            </label>
            </div> 
          </div>}
         { (formType === "login") &&  formType!=="ResetPassword" && <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="adminRadio"
              value={"admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="adminRadio" className="form-check-label">
              Admin
            </label>
          </div>
          }
         {formType!=="ForgotPassword" && formType!=="ResetPassword" && <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="hospitalRadio"
              value={"hospital"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="hospitalRadio" className="form-check-label">
              Hospital
            </label>
          </div>}
          {formType!=="ForgotPassword" && formType!=="ResetPassword" && <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="organisationRadio"
              value={"organisation"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="organisationRadio" className="form-check-label">
              Organisation
            </label>
          </div>}
        </div>
        {/* switch statement */}
        {(() => {
          //eslint-disable-next-line
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    labelText={"email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            }
            case formType === "register": {
              return (
                <>
                  {(role === "admin" || role === "donar") && (
                    <InputType
                      labelText={"Name*"}
                      labelFor={"forName"}
                      inputType={"text"}
                      name={"name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                     {role === "donar" && (
                    <InputType
                      labelText={"Blood group*"}
                      labelFor={"Blood Group"}
                      inputType={"text"}
                      name={"Blood Group"}
                      value={userBloodGroup}
                      onChange={(e) => setUserBloodGroup(e.target.value)}
                    />
                  )}
                  {role === "organisation" && (
                    <InputType
                      labelText={"Organisation Name*"}
                      labelFor={"fororganisationName"}
                      inputType={"text"}
                      name={"organisationName"}
                      value={organisationName}
                      onChange={(e) => setOrganisationName(e.target.value)}
                    />
                  )}
                  {role === "hospital" && (
                    <InputType
                      labelText={"Hospital Name*"}
                      labelFor={"forHospitalName"}
                      inputType={"text"}
                      name={"hospitalName"}
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  )}

                  <InputType
                    labelText={"Email*"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password*"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                 {(role === "hospital"  || role === "organisation") &&
                 <InputType
                    labelText={"Website"}
                    labelFor={"forWebsite"}
                    inputType={"text"}
                    name={"website"}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />}
                  <InputType
                    labelText={"Address*"}
                    labelFor={"forAddress"}
                    inputType={"text"}
                    name={"address"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <InputType
                    labelText={"Phone*"}
                    labelFor={"forPhone"}
                    inputType={"text"}
                    name={"phone"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </>
              );
            }
            case formType === "ForgotPassword":{
              return(
                <>
                    <InputType
                    labelText={"email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  
                  {/* <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  /> */}
                </>
              )
            }

            case formType === "ResetPassword":{
              return(
                <>
                    <InputType
                    labelText={"email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {/* <InputType
                    labelText={"Old Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"oldpassword"}
                    value={oldpassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  /> */}
                   <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    required 
                    // pattern="^[a-zA-Z/d]{3,7}$"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  
                </>
              )
            }




          }
        })()}
      

        <div className="d-flex flex-column justify-content-between align-items-center ">
        <button className="btn btn-primary " style={{background:"#2d3282",margin:10,width:"10rem"}} type="submit">
            {submitBtn}
          </button>
          {formType === "login" && (
            <div className="d-flex gap-2">
             <p>
              Register
              <Link to="/register"   > Here !</Link>
            </p>
            <p>
              <Link to="/forgot-password">
                Forgot Password ?
              </Link>
              </p>
            </div>

          ) }
           {formType==="register" && (
            
            <p>
              Already User Please
              <Link to="/login" > Login ! </Link>
            </p>
          )}
          {((formType==="ForgotPassword") || (formType==="ResetPassword")) && (
            
            <p>
            
              <Link to="/" >   Go Back</Link>
            </p>
          )}
         
        </div>
      </form>
    </div>
  );
};

export default Form;
