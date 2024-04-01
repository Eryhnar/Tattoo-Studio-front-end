import { useEffect, useState, useContext } from "react";
import "./Appointments.css";
import { CCard } from "../../common/CCard/CCard";
import { CInput } from "../../common/CInput/CInput";
import { CDropdown } from "../../common/CDropdown/CDropdown";
import { CButton } from "../../common/CButton/CButton";
import { TokenContext } from "../../App";
import { GetServicesService, GetArtistsService, UpdateAppointmentService, DeleteAppointmentService, CreateAppointmentService, GetAppointmentsService } from "../../services/apiCalls";

export const Appointments = () => {
    const { token, setToken } = useContext(TokenContext);
    const [appointments, setAppointments] = useState([]);
    const [openNew, setOpenNew] = useState(false);
    const [newAppointment, setNewAppointment] = useState({
        customerId: "",
        artistId: "",
        serviceId: "",
        date: "",
    });
    const [date, setDate] = useState("");

    const [msgError, setMsgError] = useState("");
    const [status, setStatus] = useState("pending");

    const [services, setServices] = useState([]);
    const [artists, setArtists] = useState([]);

    const [appointmentToEdit, setAppointmentToEdit] = useState(null);
    const [isOpenEdit, setIsOpenEdit] = useState(false);

    const [editAppointment, setEditAppointment] = useState({
        id: "",
        artistId: "",
        serviceId: "",
        date: "",
    });
    // const [editWrite, setEditWrite] = useState("disabled");

    useEffect(() => {
        const getAppointments = async () => {
            console.log("status", status)
            const token = localStorage.getItem("token");
            const response = await GetAppointmentsService(status, JSON.parse(localStorage.getItem("token")));
            setAppointments(response.data);
            console.log("response data", response.data);
        };
        getAppointments();
        if (token.roleName === "customer") {
            setNewAppointment(prevState => ({
                ...prevState,
                customerId: token.userId
            }));
        }
    }, [status]);

    useEffect(() => {
        const fetchServices = async () => {
            const response = await GetServicesService();
            setServices(response.data);
        };
        const fetchArtists = async () => {
            const response = await GetArtistsService();
            setArtists(response.data);
        };
    
        if (openNew || isOpenEdit) {
            if (services.length === 0) {
                fetchServices();
            }
            if (artists.length === 0) {
                fetchArtists();
            }
        }
    }, [openNew, isOpenEdit]);

    const inputHandler = (e) => {
        let value = e.target.value;
        if (e.target.name === "date") {
            setDate(value);
            value += ":00.000Z";
            console.log("value", value);
        }
        setNewAppointment((prevState) => ({
            ...prevState,
            [e.target.name]: value,
        }));
    };

    const editInputHandler = (e) => {
        console.log("e.target.value", e.target.value);
        setEditAppointment((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        // setTimeout(() => {
        //     console.log("editAppointment", editAppointment);
        // }, 1000);
    };

    const toggleCardVisibility = (e) => {
        if (!e.target.classList.contains("appointment-header")) return;
        let card = e.target.closest(".appointment").querySelector(".appointment-body");
        card.classList.toggle("appointment-body-hidden");
        e.target.classList.toggle("appointment-header-closed");
    };

    const createAppointment = async () => {
        try {
            const response = await CreateAppointmentService(newAppointment, JSON.parse(localStorage.getItem("token")));
            console.log(response.data);
            if (response.success === false) {
                throw new Error(response.message);
            }
            setOpenNew(false);
            return response.data;
        } catch (error) {
            setMsgError(error.message);
        }
    }

    const startEditingAppointment = (appointment) => {
        console.log("appointment", appointment);
        console.log("appointment.service.id", appointment.service.id);
        setEditAppointment({
            id: appointment.id,
            artistId: appointment.artist.id,
            serviceId: appointment.service.id,
            date: appointment.date,
        })
        setIsOpenEdit(true);

        // setTimeout(() => {
        //     console.log("editAppointment", editAppointment);
        // }, 5000);
    }
    // console.log("editAppointment", editAppointment);

    const updateAppointment = async (updatedAppointment) => { //TODO change with hook
        try {
            const response = await UpdateAppointmentService(updatedAppointment, JSON.parse(localStorage.getItem("token")));
            // setAppointments(appointments => {
            //     return appointments.map(appointment => 
            //         appointment.id === updatedAppointment.id ? updatedAppointment : appointment
            //     );
            // });
            setIsOpenEdit(false);
        } catch (error) {
            console.log(error);
            //set error
        }
    };

    const deleteAppointment = async (id) => {
        try {
            const response = await DeleteAppointmentService(id, JSON.parse(localStorage.getItem("token")));
            setAppointments(appointments.filter(appointment => appointment.id !== id));
            appointments.filter(appointment => appointment.id !== id);
        } catch (error) {
            console.log(error);
            //set error
        }
    }

    return (
        <div className="appointmentsDesign">
            {isOpenEdit && (
                <CCard
                    className={"edit-popup"}
                    title={""}
                    content={
                        <div className="edit-popup-content">
                            <CDropdown
                                buttonClass="artist-selector"
                                dropdownClass="artist-dropdown"
                                title="artistId"
                                items={artists}
                                onChangeFunction={(e) => { editInputHandler(e) }}
                            />
                            <CDropdown
                                buttonClass="service-selector"
                                dropdownClass="service-dropdown"
                                title="serviceId"
                                items={services}
                                onChangeFunction={(e) => { editInputHandler(e) }}
                            />
                            <CInput
                                className={"date-time"}
                                type="datetime-local"
                                placeholder="Date"
                                name="date"
                                disabled=""
                                value={editAppointment.date || ""}
                                onChangeFunction={(e) => { editInputHandler(e) }}
                                min={new Date().toISOString().slice(0, 16)}
                            />
                            <div className="edit-appointment-buttons">
                                <CButton
                                    className="edit-appointment-save"
                                    title="Save"
                                    onClickFunction={() => updateAppointment(editAppointment)}
                                />
                                <CButton
                                    className="edit-appointment-cancel"
                                    title="Cancel"
                                    onClickFunction={() => setIsOpenEdit(false)}
                                />
                            </div>
                        </div>
                    }
                    image={""}
                />
            )}
            <div className="body-content">
                <div className="appointment-status-selectors">
                    <CButton
                        className={`appointment-status-selector ${status === 'pending' ? 'active-filter' : ''}`}
                        title="Pending"
                        onClickFunction={() => setStatus("pending")}
                    />
                    <CButton
                        className={`appointment-status-selector ${status === 'done' ? 'active-filter' : ''}`}
                        title="Done"
                        onClickFunction={() => setStatus("done")}
                    />
                    <CButton
                        className={`appointment-status-selector ${status === 'cancelled' ? 'active-filter' : ''}`}
                        title="Cancelled"
                        onClickFunction={() => setStatus("cancelled")}
                    />
                </div>
                {(openNew)
                    ? <CCard
                        className={"new-appointment"}
                        title={""}
                        content={
                            <div className="new-appointment-content">
                                <CDropdown
                                    buttonClass="artist-selector"
                                    dropdownClass="artist-dropdown"
                                    title="artistId"
                                    items={artists}
                                    onChangeFunction={(e) => { inputHandler(e) }}
                                />
                                <CDropdown
                                    buttonClass="service-selector"
                                    dropdownClass="service-dropdown"
                                    title="serviceId"
                                    items={services}
                                    onChangeFunction={(e) => { inputHandler(e) }}
                                />
                                <CInput
                                    className={"date-time"}
                                    type="datetime-local"
                                    placeholder="Date"
                                    name="date"
                                    disabled=""
                                    value={date || ""}
                                    onChangeFunction={(e) => { inputHandler(e) }}
                                    min={new Date().toISOString().slice(0, 16)}
                                />
                                <div className="create-appointment-buttons">
                                    <CButton
                                        className="new-appointment-save"
                                        title="Save"
                                        onClickFunction={createAppointment}
                                    />
                                    <CButton
                                        className="new-appointment-cancel"
                                        title="Cancel"
                                        onClickFunction={() => {
                                            setOpenNew(false);
                                            setNewAppointment({
                                                customerId: "",
                                                artistId: "",
                                                serviceId: "",
                                                date: "",
                                            });
                                        }}
                                    />
                                </div>
                                <p>{msgError}</p>
                            </div>
                        }
                        image={""}
                    />
                    : <CButton
                        className="new-appointment-button"
                        title={<span className="material-symbols-outlined">add</span>}
                        onClickFunction={() => setOpenNew(true)}
                    />
                }
                <div className="appointments">
                    {appointments.map((appointment) => {
                        let dateTime = appointment.date.split("T", 2);
                        let datePreFormat = dateTime[0];
                        let date = datePreFormat.split("-", 3).reverse().join("-");
                        let hourMinutes = dateTime[1].split(":", 2);
                        let time = hourMinutes.join(":")

                        return (
                            <CCard
                                key={appointment.id}
                                className={"appointment"}
                                title={""}
                                content={
                                    <div className="appointment-content" onClick={toggleCardVisibility}>
                                        <div className="appointment-header appointment-header-closed">
                                            {"Service: " + appointment.service.name}
                                        </div>
                                        <div className="appointment-body appointment-body-hidden">

                                            <div className="edit-delete">
                                                {/* {editWrite === "disabled" 
                                                    ? 
                                                    <>
                                                        <CButton
                                                            className="edit-appointment"
                                                            title={<span className="material-symbols-outlined">edit</span>}
                                                            onClickFunction={() => setEditWrite(editWrite === "disabled" ? "" : "disabled")}
                                                        />
                                                        <CButton
                                                            className="delete-appointment"
                                                            title={<span className="material-symbols-outlined">delete</span>}
                                                            onClickFunction={() => { }}
                                                        />
                                                    </>
                                                    :
                                                    <>
                                                        <CButton
                                                            className="save-appointment"
                                                            title={<span className="material-symbols-outlined">done</span>}
                                                            onClickFunction={updateAppointment}
                                                        />
                                                        <CButton
                                                            className="cancel-appointment"
                                                            title={<span className="material-symbols-outlined">close</span>}
                                                            onClickFunction={() => setEditWrite(editWrite === "disabled" ? "" : "disabled")}
                                                        />
                                                    </>
                                                } */}
                                                <CButton
                                                    className="edit-appointment"
                                                    title={<span className="material-symbols-outlined">edit</span>}
                                                    onClickFunction={() => startEditingAppointment(appointment)}
                                                />
                                                <CButton
                                                    className="delete-appointment"
                                                    title={<span className="material-symbols-outlined">delete</span>}
                                                    onClickFunction={() => { deleteAppointment(appointment.id) }}
                                                />
                                            </div>

                                            {/* <p>Artist: {appointment.artist.name}</p>
                                            <p>Date: {date}</p>
                                            <p>Time: {time}</p>
                                            {appointment.catalogue &&
                                                <div className="appointment-content-catalogue">
                                                    <p>Catalogue: {appointment.catalogue.name}</p>
                                                    <p>Price: {appointment.catalogue.price}</p>
                                                    <div className="appointment-img">
                                                        <img src={appointment.catalogue.afterImage} alt="catalogue" />
                                                    </div>
                                                </div>
                                            } */}
                                            <div className="appointment-container">
                                                <div className="appointment-text">
                                                {/* <CDropdown
                                                    buttonClass="appointment-input"
                                                    dropdownClass="artist-dropdown"
                                                    title="artistId"
                                                    items={artists}
                                                    onChangeFunction={(e) => { editAppointmentHandler(e) }}
                                                    disabled={editWrite}
                                                /> */}
                                                    {/* <p>Service: {appointment.service.name}</p> */}
                                                    <p>Artist: {appointment.artist.name}</p>
                                                    <p>Date: {date}</p>
                                                    {/* <CInput
                                                        className={"appointment-input"}
                                                        type="date"
                                                        placeholder="Date"
                                                        name="date"
                                                        disabled={editWrite}
                                                        value={editAppointment.date || ""}
                                                        onChangeFunction={(e) => { editAppointmentHandler(e) }}
                                                        min={new Date().toISOString().slice(0, 16)}
                                                    /> */}
                                                    <p>Time: {time}</p>
                                                    {/* <CInput
                                                        className={"appointment-input"}
                                                        type="time"
                                                        placeholder="Time"
                                                        name="time"
                                                        disabled={editWrite}
                                                        value={editAppointment.time || ""}
                                                        onChangeFunction={(e) => { editAppointmentHandler(e) }}
                                                        min={new Date().toISOString().slice(0, 16)}
                                                    /> */}
                                                    {appointment.catalogue &&
                                                        <div className="appointment-content-catalogue">
                                                            <p>Catalogue: {appointment.catalogue.name}</p>
                                                            <p>Price: {appointment.catalogue.price}</p>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="appointment-img">
                                                    {appointment.catalogue ?
                                                        <img src={appointment.catalogue.afterImage} alt="catalogue" />
                                                        : "picture not available"
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                image={""}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}