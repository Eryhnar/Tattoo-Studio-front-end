const root = "http://localhost:4000/api/";

export const RegisterService = async (user) => {
    const response = await fetch(root + "register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    return response.json();
}

export const LoginService = async (user) => {
    const response = await fetch(root + "login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    return response.json();
}

export const GetProfileService = async (token) => {
    const response = await fetch(root + "profile", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.json();
}

export const UpdateProfileService = async (user, token) => {
    const response = await fetch(root + "profile", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
    });

    return response.json();
}