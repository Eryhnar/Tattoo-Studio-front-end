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