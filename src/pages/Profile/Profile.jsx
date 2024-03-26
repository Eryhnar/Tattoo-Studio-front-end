import React from "react";
import { useEffect, useState } from "react";
import { GetProfileService } from "../../services/apiCalls";
import "./Profile.css";
import { TokenContext } from "../../App";
import { CCard } from "../../common/CCard/CCard";
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";

export const Profile = () => {
    const {token, setToken} = React.useContext(TokenContext);
    const [hasUser, setHasUser] = useState(false);
    const [profile, setProfile] = useState({
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

    return (
        <div className="profile-design">
            <CCard 
                className={"profile-card"}
                title={profile.name} 
                content={
                    <div className="profile-inputs">
                        <div className="name-field">
                            <p>Name</p>
                            <CInput 
                                className={"profile-input"}
                                type="name"
                                name="name"
                                disabled="disabled"
                                value={profile.name || ""}
                                onChangeFunction={() => {}}
                            />
                            <div className="edit-icon"></div>
                        </div>
                        <div className="surname-field">
                            <p>Surname</p>
                            <CInput 
                                className={"profile-input"}
                                type="surname"
                                name="surname"
                                disabled="disabled"
                                value={profile.surname || ""}
                                onChangeFunction={() => {}}
                            />
                        </div>
                        <div className="email-field">
                            <p>Email</p>
                            <CInput 
                                className={"profile-input"}
                                type="email"
                                name="email"
                                disabled="disabled"
                                value={profile.email || ""}
                                onChangeFunction={() => {}}
                            />
                        </div>
                        <CButton
                            className={"change-password-button"}
                            title={"change password"}
                            onClickFunction={() => {}}
                        />
                        <CButton
                            className={"edit-profile-button"}
                            title={"edit profile"}
                            onClickFunction={() => {}}
                        />
                    </div>
                }
            />
        </div>
    );
}