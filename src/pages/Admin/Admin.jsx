import { CButton } from "../../common/CButton/CButton";
import "./Admin.css";
import { useEffect, useState } from "react";
import { GetUsersService, GetServicesService, GetCatalogueService, GetAllAppointmentsService, UpdateUserByIdService, DeleteUserByIdService } from "../../services/apiCalls";
import { CTable } from "../../common/CTable/CTable";
import { LoadingScreen } from "../../common/LoadingScreen/LoadingScreen";
import React from "react"; //TODO remove after implementing dynamic table

export const Admin = () => {
    const [users, setUsers] = useState([]);
    const [services, setServices] = useState([]);
    const [catalogue, setCatalogue] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [retries, setRetries] = useState(3);

    const fetchUsers = async (token) => {
        // if (retries > 0) {
            try {
                const response = await GetUsersService(token);
                setUsers(response.data);
                setFilter("users")
                // setRetries(3);
            } catch (error) {
                console.log(error);
                // setRetries(prevRetries => prevRetries - 1);
            }
        // }
    }
    const fetchServices = async () => {
        // try {
        //     const response = await GetServicesService();
        //     setServices(response.data);
        //     setFilter("services")
        // } catch (error) {
        //     console.log(error);
        // }
        setFilter("services")
    }

    const fetchCatalogue = async () => {
        // try {
        //     const response = await GetCatalogueService();
        //     setCatalogue(response.data);
        //     setFilter("catalogue")
        // } catch (error) {
        //     console.log(error);
        // }
        setFilter("catalogue")
    }

    const fetchAppointments = async (token) => {
        // try {
        //     const response = await GetAllAppointmentsService(token);
        //     setAppointments(response.data);
        //     setFilter("appointments")
        // } catch (error) {
        //     console.log(error);
        // }
        setFilter("appointments")
    }

    const editFunction = async (item) => {
        const response = await UpdateUserByIdService(item, JSON.parse(localStorage.getItem("token")));
        // setData()
    }

    const deleteFunction = async (item) => {
        const response = await DeleteUserByIdService(item, JSON.parse(localStorage.getItem("token")));
        setUsers(users.filter((user) => user.id !== item.id));
    }

    const getData = () => {
        switch (filter) {
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

    return (
        <div className="admin-design">
            <div className="admin-body">
                <div className="admin-header">
                    <CButton
                        className={`admin-header-button ${filter === "users" && "admin-header-button-active"}`}
                        title={"Users"}
                        onClickFunction={() => fetchUsers(JSON.parse(localStorage.getItem("token")))}
                    />
                    <CButton
                        className={`admin-header-button ${filter === "services" && "admin-header-button-active"}`}
                        title={"Services"}
                        onClickFunction={fetchServices}
                    />
                    <CButton
                        className={`admin-header-button ${filter === "catalogue" && "admin-header-button-active"}`}
                        title={"Catalogue"}
                        onClickFunction={fetchCatalogue}
                    />
                    <CButton
                        className={`admin-header-button ${filter === "appointments" && "admin-header-button-active"}`}
                        title={"Appointments"}
                        onClickFunction={() => fetchAppointments(JSON.parse(localStorage.getItem("token")))}
                    />
                </div>
                {/* <AdminUsers
                    deleteFunction={deleteFunction}
                    editFunction={editFunction}
                    data={getData()}
                /> */}
                {/* <CTable
                    className={"admin-table"}
                    data={getData()}
                    editFunction={editFunction}
                    deleteFunction={() => deleteFunction()}
                /> */}

                {(getData().length !== 0) //TODO check for isLoading instead
                    ?
                    <>
                        {/* <div className={`admin-table-${filter}`}> */}
                        <div className="admin-table">
                            <div className="admin-table-users">
                                {Object.keys(getData()[0]).map((key) => (
                                    <div key={key} className="admin-table-header-title">
                                        {key}
                                    </div>
                                ))}
                                <div className="admin-table-header-title">Edit</div>
                                <div className="admin-table-header-title">Delete</div>
                                {getData().map((item, index) => (
                                    <React.Fragment key={index}> {/*TODO remove after implementing dynamic table*/}
                                        {Object.keys(item).map((key) => (
                                            <div key={key} className="admin-table-row-item">
                                                {item[key]}
                                            </div>
                                        ))}
                                        {/* <div className="admin-table-button-container"> */}
                                        <CButton
                                            key={`edit-${index}`}
                                            className={"admin-table-button"}
                                            title={"Edit"}
                                            onClickFunction={() => editFunction(item)}
                                        />
                                        <CButton
                                            key={`delete-${index}`}
                                            className={"admin-table-button"}
                                            title={"Delete"}
                                            onClickFunction={() => deleteFunction(item)}
                                        />
                                        {/* </div> */}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </>
                    : filter === "" 
                    ?
                    <div className="admin-welcome">
                        <h1>Welcome to the Admin Page!</h1>
                        <p>Select the data to see.</p>
                    </div> 
                    :
                    // <LoadingScreen />
                    <div className="WIP">Comming Soon</div>
                    
                    
                }
            </div>
        </div>
    )
}