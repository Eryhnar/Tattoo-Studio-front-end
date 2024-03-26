import React from "react";
import "./Header.css";
import { NavButton } from "../NavButton/NavButton";
import { useState } from "react";
import { TokenContext } from "../../App";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();
    const { token, setToken } = React.useContext(TokenContext);

    const logOut = () => {
        setToken(null);
        navigate("/");
    };

    return (
        <div className="headerDesign">
            <div className="headerLeft">
                <NavButton title="Home" path="/" />
            </div>
            <div className="headerRight">
                {token ? (
                    <>
                        <NavButton title="Profile" path="/profile" />
                        <div onClick={logOut}>
                            <NavButton title="Logout" path="/" />
                        </div>
                    </>
                ) : (
                    <>
                        <NavButton title="Register" path="/register" />
                        <NavButton title="Login" path="/login" />
                    </>
                )}
            </div>
        </div>
    );
}