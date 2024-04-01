import React from "react";
import "./Header.css";
import { NavButton } from "../NavButton/NavButton";
import { useState, useEffect } from "react";
import { TokenContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();
    const { token, setToken } = React.useContext(TokenContext);

    const [menuOpen, setMenuOpen] = useState(false);

    const logOut = () => {
        setToken(null);
        localStorage.removeItem("token");
        navigate("/");
    };

    // useEffect(() => {
    //     if (!menuOpen) {
    //         setTimeout(() => {
    //             document.querySelector(".burger-menu").style.display = "none";
    //         }, 500);
    //     } else {
    //         document.querySelector(".burger-menu").style.display = "block";
    //     }
    // }, [menuOpen]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        // if (menuOpen) {
        //     document.querySelector(".burger-menu").style.display = "block";
        // }

        // if (!menuOpen) {
        //     setTimeout(() => {
        //         document.querySelector(".burger-menu").style.display = "none";
        //     }, 500);
        // }
    }

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
                {/* <div className="hidden-nav"> */}
                    <NavLink
                        to="/services"
                        className={"nav-button-design hidden-nav"}
                    >
                        Services
                    </NavLink>
                    <NavLink
                        to="/catalogue"
                        className={"nav-button-design hidden-nav"}
                    >
                        Catalogue
                    </NavLink>
                {/* </div> */}
                {/* <NavButton title="Services" path="/services" /> */}
            </div>
            <div className="burger-button" onClick={toggleMenu}>{menuOpen 
                ? <span className="material-symbols-outlined">menu_open</span> 
                : <span className="material-symbols-outlined">
                menu
                </span>}</div>
            <div className={`burger-menu ${menuOpen ? "" : "burger-menu-hidden"}`}>
                <ul>
                    <li>
                        <NavLink
                            to="/services"
                            className={"nav-button-design"}
                        >
                            Services
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/catalogue"
                            className={"nav-button-design"}
                        >
                            Catalogue
                        </NavLink>
                    </li>
                    {token ? (
                        <>
                            {token.roleName.includes("admin") ? (
                                <li>
                                    <NavLink
                                        to="/admin"
                                        className={"nav-button-design"}
                                    >
                                        Admin
                                    </NavLink>
                                </li>
                            ) : null}
                            <li>
                                <NavLink
                                    to="/appointments"
                                    className={"nav-button-design"}
                                >
                                    Appointments
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/profile"
                                    className={"nav-button-design"}
                                >
                                    {token.name}
                                </NavLink>
                            </li>
                            <li onClick={logOut}>
                                <NavButton title="Logout" path="/" />
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink
                                    to="/register"
                                    className={"nav-button-design"}
                                >
                                    Register
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/login"
                                    className={"nav-button-design"}
                                >
                                    Login
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            <div className="header-right">
                {token ? (
                    <>
                        {token.roleName.includes("admin") ? (
                            <NavLink
                                to="/admin"
                                className={"nav-button-design"}
                            >
                                Admin
                            </NavLink>
                        ) : null}
                        <NavLink
                            to="/appointments"
                            className={"nav-button-design"}
                        >
                            Appointments
                        </NavLink>
                        <NavLink
                            to="/profile"
                            className={"nav-button-design"}
                        >
                            {token.name}
                        </NavLink>
                        <div onClick={logOut}>
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
                        <NavLink
                            to="/login"
                            className={"nav-button-design"}
                        >
                            Login
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
}