import React from "react";
import { useEffect, useState } from "react";
import { GetProfileService, UpdateProfileService } from "../../services/apiCalls";
import "./Profile.css";
import { TokenContext } from "../../App";
import { CCard } from "../../common/CCard/CCard";
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";

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
            } catch (error) {
                console.log(error);
            }
        }
        if (!hasUser) {
            fetchProfile();
            setHasUser(true);
        }
    }, []);
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
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="profile-design">
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
                                    title={""}
                                    onClickFunction={() => writeField("name")}
                                    /> 
                                </div>
                                : <div className="edit-fields">
                                    <CButton
                                        className={"save-icon"}
                                        title={""}
                                        onClickFunction={async () => {
                                            const newProfile = await updateProfile(profile);
                                            if (newProfile) {
                                                writeField("name");
                                                setProfile(newProfile);
                                                setOriginalProfile(profile);
                                                setToken(newProfile);
                                            }
                                        }}
                                    />
                                    <CButton
                                        className={"cancel-icon"}
                                        title={""}
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
                                    title={""}
                                    onClickFunction={() => writeField("surname")}
                                    /> 
                                </div>
                                : <div className="edit-fields">
                                    <CButton
                                        className={"save-icon"}
                                        title={""}
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
                                        title={""}
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
                            onClickFunction={() => {}}
                        />
                        {/* <CButton
                            className={"edit-profile-button"}
                            title={"edit profile"}
                            onClickFunction={() => {}}
                        /> */}
                    </div>
                }
            />
        </div>
    );
}