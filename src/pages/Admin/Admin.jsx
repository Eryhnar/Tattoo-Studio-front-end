import { CButton } from "../../common/CButton/CButton";
import "./Admin.css";
import { useState } from "react";
import { GetUsersService, GetServicesService, GetCatalogueService, GetAllAppointmentsService, UpdateUserByIdService } from "../../services/apiCalls";
import { CTable } from "../../common/CTable/CTable";

export const Admin = () => {
    const [users, setUsers] = useState([]);
    const [services, setServices] = useState([]);
    const [catalogue, setCatalogue] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [data, setData] = useState({});
    const [filter, setFilter] = useState("");

    const fetchUsers = async (token) => {
        try {
            const response = await GetUsersService(token);
            setUsers(response.data);
            setFilter("users")
        } catch (error) {
            console.log(error);
        }
    }

    const fetchServices = async () => {
        try {
            const response = await GetServicesService();
            setServices(response.data);
            setFilter("services")
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCatalogue = async () => {
        try {
            const response = await GetCatalogueService();
            setCatalogue(response.data);
            setFilter("catalogue")
        } catch (error) {
            console.log(error);
        }
    }

    const fetchAppointments = async (token) => {
        try {
            const response = await GetAllAppointmentsService(token);
            setAppointments(response.data);
            setFilter("appointments")
        } catch (error) {
            console.log(error);
        }
    }

    const editFunction = async (item) => {
        const response = await UpdateUserByIdService(item, JSON.parse(localStorage.getItem("token")));
        setData()
    }

    const getData = () => {
        switch(filter) {
            case "users":
                return users;
            case "services":
                return services;
            case "catalogue":
                return catalogue;
            case "appointments":
                return appointments;
            default:
                return [];
        }
    }

console.log("users", users, "services" ,services, "catalogue", catalogue, "appointments", appointments);
    return (
        <div className="admin-design">
            <div className="admin-body">
                <div className="admin-header">
                    <CButton
                        className={"admin-header-button"}
                        title={"Users"}
                        onClickFunction={() => fetchUsers(JSON.parse(localStorage.getItem("token")))}
                    />
                    <CButton
                        className={"admin-header-button"}
                        title={"Services"}
                        onClickFunction={fetchServices}
                    />
                    <CButton
                        className={"admin-header-button"}
                        title={"Catalogue"}
                        onClickFunction={() => {}}
                    />
                    <CButton
                        className={"admin-header-button"}
                        title={"Appointments"}
                        onClickFunction={() => fetchAppointments(JSON.parse(localStorage.getItem("token")))}
                    />
                </div>
                <CTable
                    className={"admin-table"}
                    data={getData()}
                    editFunction={editFunction}
                    deleteFunction={() => {}}
                />
                

                Admin
            </div>
        </div>
    )
}