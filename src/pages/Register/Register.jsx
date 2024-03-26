import { CButton } from "../../common/CButton/CButton";
import { CInput } from "../../common/CInput/CInput";
import { Header } from "../../common/Header/Header";
import { useNavigate } from "react-router-dom";
import { RegisterService } from "../../services/apiCalls";
import { useState } from "react";
import "./Register.css";

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

        } catch (error) {
            setMsgError(error.message);
        }
    };
    
    return (
        <>
            <div className="registerDesign">
                <CInput
                    className="inputDesign"
                    type="name"
                    placeholder="John"
                    name="name"
                    disabled=""
                    value={user.name || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                />
                <CInput
                    className="inputDesign"
                    type="email"
                    placeholder="email@yourdomain.com"
                    name="email"
                    disabled=""
                    value={user.email || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                />
                <CInput
                    className="inputDesign"
                    type="password"
                    placeholder="password"
                    name="password"
                    disabled=""
                    value={user.password || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                />
                <CButton 
                    className="registerButton"
                    title="Register"
                    onClickFunction={registerUser}
                />
                <div className="error">{msgError}</div>
            </div>
        </>
    )
}