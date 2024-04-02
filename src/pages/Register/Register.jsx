import { CButton } from "../../common/CButton/CButton";
import { CInput } from "../../common/CInput/CInput";
import { CCard } from "../../common/CCard/CCard";
import { useNavigate } from "react-router-dom";
import { RegisterService } from "../../services/apiCalls";
import { useState } from "react";
import "./Register.css";
import { NavButton } from "../../common/NavButton/NavButton";

export const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [userError, setUserError] = useState({
        nameError: "",
        emailError: "",
        passwordError: "",
    });

    const [msgError, setMsgError] = useState("");

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    // const checkError = (e) => {
    //     const error = validame(e.target.name, e.target.value);
    
    //     setUserError((prevState) => ({
    //       ...prevState,
    //       [e.target.name + "Error"]: error,
    //     }));
    // };

    const registerUser = async () => {
        try {
            for (let prop in user) {
                if (user[prop] === "") {
                    throw new Error("All fields are required");
                }
            }

            const response = await RegisterService(user);

            setMsgError(response.message);

            // setTimeout(() => {
            //     navigate("/");
            // }, 1200);

            navigate("/login");

        } catch (error) {
            setMsgError(error.message);
        }
    };
    
    return (
        // <>
        //     <div className="register-design">
        //         <div className="register-card">
        //             <CInput
        //                 className="register-input"
        //                 type="name"
        //                 placeholder="John"
        //                 name="name"
        //                 disabled=""
        //                 value={user.name || ""}
        //                 onChangeFunction={(e) => inputHandler(e)}
        //             />
        //             <CInput
        //                 className="register-input"
        //                 type="email"
        //                 placeholder="email@yourdomain.com"
        //                 name="email"
        //                 disabled=""
        //                 value={user.email || ""}
        //                 onChangeFunction={(e) => inputHandler(e)}
        //             />
        //             <CInput
        //                 className="register-input"
        //                 type="password"
        //                 placeholder="password"
        //                 name="password"
        //                 disabled=""
        //                 value={user.password || ""}
        //                 onChangeFunction={(e) => inputHandler(e)}
        //             />
        //             <CButton
        //                 className="register-button"
        //                 title="Register"
        //                 onClickFunction={registerUser}
        //             />
        //             <div className="error">{msgError}</div>
        //         </div>
        //     </div>
        // </>
        <>
            <div className="register-design">
                <CCard
                    className="register-card"
                    title=""
                    content={
                        <div className="register-inputs">  
                            <div className="name-field">  
                                <p>Name</p>
                                <CInput
                                    className="register-input"
                                    type="name"
                                    placeholder="John"
                                    name="name"
                                    disabled=""
                                    value={user.name || ""}
                                    onChangeFunction={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="email-field">
                                <p>Email</p>
                                <CInput
                                    className="register-input"
                                    type="email"
                                    placeholder="email@yourdomain.com"
                                    name="email"
                                    disabled=""
                                    value={user.email || ""}
                                    onChangeFunction={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="password-field">
                                <p>Password</p>
                                <CInput
                                    className="register-input"
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    disabled=""
                                    value={user.password || ""}
                                    onChangeFunction={(e) => inputHandler(e)}
                                />
                            </div>
                            <CButton
                                className="register-button"
                                title="Register"
                                onClickFunction={registerUser}
                            />
                            <div className="error">{msgError}</div>
                            <NavButton
                                className="login-redirect"
                                title="Already registered? Click here to log in!"
                                path="/login"
                            />
                        </div>
                    }
                />
            </div>
        </>
    )
}