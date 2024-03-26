import React from "react";
import { useEffect, useState } from "react";
import { GetProfileService } from "../../services/apiCalls";
import "./Profile.css";
import { TokenContext } from "../../App";

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
        <div className="profileDesign">
            This is Profile
        </div>
    );
}