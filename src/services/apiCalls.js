const root = "http://localhost:4000/api/";

export const RegisterService = async (user) => {
    try {
        const response = await fetch(root + "register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

export const LoginService = async (user) => {
    try {
        const response = await fetch(root + "login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

export const GetProfileService = async (token) => {
    try {
        const response = await fetch(root + "users/profile", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.json();
    } catch (error) {
        throw error;
    }
}

export const UpdateProfileService = async (user, token) => {
    try {
        const response = await fetch(root + "users/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

export const GetServicesService = async () => {
    try {
        const response = await fetch(root + "services", {
            method: "GET",
        });
        return response.json();
    } catch (error) {
        throw error;
    }
}

export const GetAppointmentsService = async (state, token) => {
    try {
        const response = await fetch(`${root}appointments/user?status=${state}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.json();
    } catch (error) {
        throw error;
    }
}

export const CreateAppointmentService = async (appointment, token) => {
    try {
        const response = await fetch(root + "appointments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(appointment),
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

export const GetArtistsService = async () => {
    try {
        const response = await fetch(root + "users/artists", {
            method: "GET",
        });
        return response.json();
    } catch (error) {
        throw error;
    }
}

export const UpdateAppointmentService = async (appointment, token) => {
    const { id, ...rest } = appointment;
    try {
        const response = await fetch(root + `appointments/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(rest),
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

export const DeleteAppointmentService = async (id, token) => {
    try {
        const response = await fetch(root + `appointments/${id}/cancel`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

export const GetUsersService = async (token) => {
    try {
        const response = await fetch(root + "users", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.json();
    } catch (error) {
        throw error;
    }
}

export const GetAllAppointmentsService = async (token) => {
    try {
        const response = await fetch(root + "appointments", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.json();
    } catch (error) {
        throw error;
    }
}

export const GetCatalogueService = async () => {
    try {
        const response = await fetch(root + "catalogue", {
            method: "GET",
        });
        return response.json();
    } catch (error) {
        throw error;
    }
}

export const UpdateUserByIdService = async (user, token) => {
    try {
        const response = await fetch(root + `users/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}