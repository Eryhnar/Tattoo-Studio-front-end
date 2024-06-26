import React from "react";
import { useEffect, useState } from "react";
import { GetProfileService, UpdateProfileService, UpdateProfilePasswordService } from "../../services/apiCalls";
import "./Profile.css";
import { TokenContext } from "../../App";
import { CCard } from "../../common/CCard/CCard";
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";
import { LoadingScreen } from "../../common/LoadingScreen/LoadingScreen";

export const Profile = () => {
    const {token, setToken} = React.useContext(TokenContext);
    const [hasUser, setHasUser] = useState(false);
    const [write, setWrite] = useState({
        name: "disabled",
        surname: "disabled",
        email: "disabled",
    });
    const [profile, setProfile] = useState({
        name: "",
        surname: "",
        email: "",
    });
    const [originalProfile, setOriginalProfile] = useState({ 
        name: "",
        surname: "",
        email: "",
    });
    const [msgError, setMsgError] = useState("");

    const [isOpenPassEdit, setIsOpenPassEdit] = useState(false);
    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [retries, setRetries] = useState(3);

    // const fetchProfile = async () => {
    //     try {
    //         const response = await GetProfileService(token);
    //         return response.data
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await GetProfileService(JSON.parse(localStorage.getItem("token")));
                setProfile(response.data);
                setOriginalProfile(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setRetries(prevRetries => prevRetries - 1);
            }
        }
        if (!hasUser && retries > 0) {
            fetchProfile();
            setHasUser(true);
            setIsLoading(true);
        }
    }, [retries]);
    // console.log(profile);

    const inputHandler = (e) => {
        setProfile((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
    };

    const writeField = (e) => {
        setWrite(prevState => ({
            ...prevState,
            [e]: prevState[e] === "disabled" ? "" : "disabled",
        }));
    }

    const resetProfile = () => {
        setProfile(originalProfile);
    }

    const updateProfile = async (field) => {
        try {
            const response = await UpdateProfileService(field, JSON.parse(localStorage.getItem("token")));
            writeField("name");
            setOriginalProfile(profile);
            setToken(prevToken => ({...prevToken, name: profile.name}));
        } catch (error) {
            console.log(error);
        }
    }

    const changePassword = async () => {
        try {
            const response = await UpdateProfilePasswordService(password, JSON.parse(localStorage.getItem("token")));
            // setIsOpenPassEdit(false);
        } catch (error) {
            setMsgError(error.message);
            console.log(error);
        }
    }

    const passInputHandler = (e) => {
        setPassword((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
    }


    return (
        <div className="profile-design">
            {isLoading
            ?
            <LoadingScreen />
            :(<>
                {isOpenPassEdit && 
                    <CCard 
                        className={"password-card"}
                        title={"Change Password"}
                        content={
                            <div className="password-inputs">
                                <div className="old-password-field">
                                    <p>Old Password</p>
                                    <CInput 
                                        className={"password-input"}
                                        type="password"
                                        name="oldPassword"
                                        value={password.oldPassword || ""}
                                        onChangeFunction={(e) => { passInputHandler(e) }}
                                    />
                                </div>
                                <div className="new-password-field">
                                    <p>New Password</p>
                                    <CInput 
                                        className={"password-input"}
                                        type="password"
                                        name="newPassword"
                                        value={password.newPassword || ""}
                                        onChangeFunction={(e) => { passInputHandler(e) }}
                                    />
                                </div>
                                <div className="confirm-password-field">
                                    <p>Confirm Password</p>
                                    <CInput 
                                        className={"password-input"}
                                        type="password"
                                        name="confirmPassword"
                                        value={password.confirmPassword || ""}
                                        onChangeFunction={(e) => { passInputHandler(e) }}
                                    />
                                </div>
                                <div className="password-update-error">{msgError}</div>
                                <CButton
                                    className={"change-password-button"}
                                    title={"change password"}
                                    onClickFunction={() => {changePassword()}}
                                />
                                <CButton
                                    className={"change-password-button"}
                                    title={"cancel"}
                                    onClickFunction={() => setIsOpenPassEdit(false)}
                                />
                            </div>
                        }
                    />
                } 
                <CCard 
                    className={"profile-card"}
                    title={token.name} 
                    content={
                        <div className="profile-inputs">
                            <div className="name-field">
                                <p>Name</p>
                                <CInput 
                                    className={"profile-input"}
                                    type="name"
                                    name="name"
                                    disabled={write.name}
                                    value={profile.name || ""}
                                    onChangeFunction={(e) => { inputHandler(e) }}
                                />
                                {/* <div className="edit-icon"></div> */}
                                {write.name === "disabled" 
                                    ? <div className="edit-fields">
                                        <CButton 
                                        className={"edit-icon"}
                                        title={<span className="material-symbols-outlined">edit</span>}
                                        onClickFunction={() => writeField("name")}
                                        /> 
                                    </div>
                                    : 
                                    <div className="edit-fields">
                                        <CButton
                                            className={"save-icon"}
                                            title={<span className="material-symbols-outlined">done</span>}
                                            onClickFunction={async () => {
                                                const newProfile = await updateProfile(profile);
                                            }}
                                        />
                                        <CButton
                                            className={"cancel-icon"}
                                            title={<span className="material-symbols-outlined">close</span>}
                                            onClickFunction={() => {
                                                writeField("name");
                                                resetProfile();
                                            }}
                                        />
                                    </div>
                                }
                            </div>
                            <div className="surname-field">
                                <p>Surname</p>
                                <CInput 
                                    className={"profile-input"}
                                    type="surname"
                                    name="surname"
                                    disabled={write.surname}
                                    value={profile.surname || ""}
                                    onChangeFunction={(e) => { inputHandler(e) }}
                                />
                                {write.surname === "disabled" 
                                    ? <div className="edit-fields">
                                        <CButton 
                                        className={"edit-icon"}
                                        title={<span className="material-symbols-outlined">edit</span>}
                                        onClickFunction={() => writeField("surname")}
                                        /> 
                                    </div>
                                    : <div className="edit-fields">
                                        <CButton
                                            className={"save-icon"}
                                            title={<span className="material-symbols-outlined">done</span>}
                                            onClickFunction={async () => {
                                                const newProfile = await updateProfile(profile);
                                                if (newProfile) {
                                                    writeField("surname");
                                                    setProfile(newProfile);
                                                    setOriginalProfile(profile);
                                                    setToken(newProfile);
                                                }
                                            }}
                                        />
                                        <CButton
                                            className={"cancel-icon"}
                                            title={<span className="material-symbols-outlined">close</span>}
                                            onClickFunction={() => {
                                                writeField("surname");
                                                resetProfile();
                                            }}
                                        />
                                    </div>
                                }
                                {/* <CButton 
                                    className={"edit-icon"}
                                    title={""}
                                    onClickFunction={() => writeField("surname")}
                                /> */}
                            </div>
                            <div className="email-field">
                                <p>Email</p>
                                <CInput 
                                    className={"profile-input"}
                                    type="email"
                                    name="email"
                                    disabled={write.email}
                                    value={profile.email || ""}
                                    onChangeFunction={(e) => { inputHandler(e) }}
                                />
                                {/* <CButton 
                                    className={"edit-icon"}
                                    title={""}
                                    onClickFunction={() => writeField("email")}
                                /> */}
                            </div>
                            <CButton
                                className={"change-password-button"}
                                title={"change password"}
                                onClickFunction={() => setIsOpenPassEdit(true)}
                            />
                            {/* <CButton
                                className={"edit-profile-button"}
                                title={"edit profile"}
                                onClickFunction={() => {}}
                            /> */}
                        </div>
                    }
                        />
                        </>)
            }
        </div>
    );
}