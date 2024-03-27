import React from "react";
import "./Login.css";
import { CInput } from "../../common/CInput/CInput";
import { Header } from "../../common/Header/Header";
import { CButton } from "../../common/CButton/CButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoginService } from "../../services/apiCalls";
import { TokenContext } from "../../App";
import { decodeToken } from "react-jwt"

export const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [userError, setUserError] = useState({
    emailError: "",
    passwordError: "",
  });

  const { token, setToken } = React.useContext(TokenContext);

  const [msgError, setMsgError] = useState("");

  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginUser = async () => {
    try {
      for (let prop in user) {
        if (user[prop] === "") {
          throw new Error("All fields are required");
        }
      }

      const response = await LoginService(user);

      setMsgError(response.message);
      const decoded = decodeToken(response.token);
      const token = response.token //remove
      localStorage.setItem("token", JSON.stringify(response.token));
      setToken(decoded);

      // setTimeout(() => {
      //     navigate("/");
      // }, 1200);

    } catch (error) {
      setMsgError(error.message);
    }
  };
  return (
    <>
      <div className="loginDesign">
        <CInput
          className="inputDesign"
          type="email"
          placeholder="email@yourdomain.com"
          name="email"
          disabled=""
          value={user.email || ""}
          onChangeFunction={(e) => { inputHandler(e) }}
        />
        <CInput
          className="inputDesign"
          type="password"
          placeholder="password"
          name="password"
          disabled=""
          value={user.password || ""}
          onChangeFunction={(e) => { inputHandler(e) }}
        />
        <CButton
          className="loginButton"
          title="Log in"
          onClickFunction={loginUser}
        />
        <div className="error">{msgError}</div>
      </div>
    </>
  );
}