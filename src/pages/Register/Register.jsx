import { CButton } from "../../common/CButton/CButton";
import { CInput } from "../../common/CInput/CInput";
import { Header } from "../../common/Header/Header";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export const Register = () => {
    const navigate = useNavigate();

    const {user, setUser} = useState({
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
            for (let elemento in user) {
                if (user[elemento] === "") {
                    throw new Error("Todos los campos tienen que estar rellenos");
                }
            }

            const response = await RegisterService(user);

            console.log(response);
            setMsgError(response.message);

            setTimeout(() => {
                navigate("/");
            }, 1200);
            
        } catch (error) {
            setMsgError(error.message);
        }
    };
    
    return (
        <>
            <Header />
            <div className="registerDesign">
                <CInput
                    className="inputDesign"
                    type="name"
                    placeholder="John"
                    name="name"
                    disabled=""
                    value=""
                    onChangeFunction={() => { }}
                />
                <CInput
                    className="inputDesign"
                    type="email"
                    placeholder="email@yourdomain.com"
                    name="email"
                    disabled=""
                    value=""
                    onChangeFunction={() => { }}
                />
                <CInput
                    className="inputDesign"
                    type="password"
                    placeholder="password"
                    name="password"
                    disabled=""
                    value=""
                    onChangeFunction={() => { }}
                />
                <CButton 
                    className="registerButton"
                    title="Register"
                    onClickFunction={() => { }}
                />
            </div>
        </>
    )
}