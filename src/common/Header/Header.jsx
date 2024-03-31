import React from "react";
import "./Header.css";
import { NavButton } from "../NavButton/NavButton";
import { useState } from "react";
import { TokenContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();
    const { token, setToken } = React.useContext(TokenContext);

    const logOut = () => {
        setToken(null);
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="header-design">
            <div className="header-left">
                <NavLink
                    to="/"
                    className={"nav-button-design"}
                >
                    Home
                </NavLink>
                {/* <NavButton title="Home" path="/" /> */}
                <NavLink
                    to="/services"
                    className={"nav-button-design"}
                >
                    Services
                </NavLink>
                {/* <NavButton title="Services" path="/services" /> */}
            </div>
            <div className="header-right">
                {token ? (
                    <>
                        <NavLink
                            to="/appointments"
                            className={"nav-button-design"}
                        >
                            Appointments
                        </NavLink>
                        {/* <NavButton title="Appointments" path="/appointments"/> */}
                        <NavLink 
                            to="/profile"
                            className={"nav-button-design"}
                            // activeClassName="active-nav-button"
                        >
                            {token.name}
                        </NavLink>
                        {/* <NavButton title={token.name} path="/profile" /> */}
                        <div onClick={logOut}>
                            {/* <NavLink
                                to="/"
                                className={"nav-button-design"}
                            >
                                Logout
                            </NavLink> */}
                            <NavButton title="Logout" path="/" />
                        </div>
                    </>
                ) : (
                    <>
                        <NavLink
                            to="/register"
                            className={"nav-button-design"}
                        >
                            Register
                        </NavLink>
                        {/* <NavButton title="Register" path="/register" /> */}
                        <NavLink
                            to="/login"
                            className={"nav-button-design"}
                        >
                            Login
                        </NavLink>
                        {/* <NavButton title="Login" path="/login" /> */}
                    </>
                )}
            </div>
        </div>
    );
}