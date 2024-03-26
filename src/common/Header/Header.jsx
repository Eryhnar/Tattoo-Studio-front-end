import React from "react";
import "./Header.css";
import { NavButton } from "../NavButton/NavButton";
import { useState } from "react";
import { TokenContext } from "../../App";

export const Header = () => {
    const { token } = React.useContext(TokenContext);

    return (
        <div className="headerDesign">
            {/* This is Header */}
            <div className="headerLeft">
                <NavButton title="Home" path="/" />
            </div>
            <div className="headerRight">
                {token ? (
                    <NavButton title="Logout" path="/" />
                ) : (
                    <>
                        <NavButton title="Register" path="/register" />
                        <NavButton title="Login" path="/login" />
                    </>
                )}
                {/* <NavButton title="Register" path="/register" />
                <NavButton title="Login" path="/login" /> */}
            </div>
        </div>
    );
}