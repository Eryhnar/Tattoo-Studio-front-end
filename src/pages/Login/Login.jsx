import React from "react";
import "./Login.css";
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";
import { CCard } from "../../common/CCard/CCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoginService } from "../../services/apiCalls";
import { TokenContext } from "../../App";
import { decodeToken } from "react-jwt"
import { NavButton } from "../../common/NavButton/NavButton";

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
            localStorage.setItem("token", JSON.stringify(response.token));
            setToken(decoded);

            navigate("/");

            // setTimeout(() => {
            //     navigate("/");
            // }, 1200);

        } catch (error) {
            setMsgError(error.message);
        }
    };
    return (
        <>
            <div className="login-design">
                <CCard
                    className="login-card"
                    title=""
                    content={
                        <div className="login-inputs">
                            <div className="email-field">
                                <p>Email</p>
                                <CInput
                                    className="login-input"
                                    type="email"
                                    placeholder="email@yourdomain.com"
                                    name="email"
                                    disabled=""
                                    value={user.email || ""}
                                    onChangeFunction={(e) => { inputHandler(e) }}
                                />
                            </div>
                            <div className="password-field">
                                <p>Password</p>
                                <CInput
                                    className="login-input"
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    disabled=""
                                    value={user.password || ""}
                                    onChangeFunction={(e) => { inputHandler(e) }}
                                />
                            </div>
                            <CButton
                                className="login-button"
                                title="Log in"
                                onClickFunction={loginUser}
                            />
                            <div className="error">{msgError}</div>
                            <NavButton 
                                className="register-redirect"
                                title="Not registered yet? Register here!"
                                path="/register"
                            />
                        </div>
                    }
                />
            </div>
        </>
    );
}