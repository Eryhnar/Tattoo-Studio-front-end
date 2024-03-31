import { useEffect, useState, useContext } from "react";
import "./Appointments.css";
import { CreateAppointmentService, GetAppointmentsService } from "../../services/apiCalls";
import { CCard } from "../../common/CCard/CCard";
import { CInput } from "../../common/CInput/CInput";
import { CDropdown } from "../../common/CDropdown/CDropdown";
import { CButton } from "../../common/CButton/CButton";
import { TokenContext } from "../../App";
import { GetServicesService } from "../../services/apiCalls";
import { GetArtistsService } from "../../services/apiCalls";

export const Appointments = () => {
    const { token, setToken } = useContext(TokenContext);
    const [ appointments, setAppointments ] = useState([]);
    const [ openNew, setOpenNew ] = useState(false);
    const [ newAppointment, setNewAppointment ] = useState({
        customerId: "",
        artistId: "",
        serviceId: "",
        date: "",
    });
    const [ date, setDate ] = useState("");

    const [ msgError, setMsgError ] = useState("");
    const [ status, setStatus ] = useState("pending");

    const [ services, setServices ] = useState([]);
    const [ artists, setArtists ] = useState([]);

    useEffect(() => {
        const getAppointments = async () => {
            const token = localStorage.getItem("token");
            const response = await GetAppointmentsService(status, JSON.parse(localStorage.getItem("token")));
            setAppointments(response.data);
            console.log("response data",response.data);
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
        if (openNew && services.length === 0) {
            fetchServices();
        }
        if (openNew && artists.length === 0) {
            fetchArtists();
        }
    }, [openNew]);

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

    return (
        <div className="appointmentsDesign">
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
                { (openNew)
                    ?<CCard
                        className= {"new-appointment"}
                        title= {""}
                        content= {
                            <div className="new-appointment-content">
                                <CDropdown
                                    buttonClass="artist-selector"
                                    dropdownClass="artist-dropdown"
                                    title="artistId"
                                    items={artists}
                                    onChangeFunction={(e) => {inputHandler(e)}}
                                />
                                <CDropdown
                                    buttonClass="service-selector"
                                    dropdownClass="service-dropdown"
                                    title="serviceId"
                                    items={services}
                                    onChangeFunction={(e) => {inputHandler(e)}}
                                />
                                <CInput
                                    className={"date-time"}
                                    type="datetime-local"
                                    placeholder="Date"
                                    name="date"
                                    disabled=""
                                    value={date || ""}
                                    onChangeFunction={(e) => {inputHandler(e)}}
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
                        image= {""}
                    />
                    : <CButton
                        className="new-appointment-button"
                        title={<span class="material-symbols-outlined">add</span>}
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
                                className= {"appointment"}
                                title= {""}
                                content= {
                                    <div className="appointment-content">
                                        <div className="appointment-header">
                                            {"Service: " + appointment.service.name}
                                        </div>
                                        <div className="appointment-body">
                                        
                                            <div className="edit-delete">
                                                <CButton
                                                    className="edit-appointment"
                                                    title={<span class="material-symbols-outlined">edit</span>}
                                                    onClickFunction={() => {}}
                                                />
                                                <CButton
                                                    className="delete-appointment"
                                                    title={<span class="material-symbols-outlined">delete</span>}
                                                    onClickFunction={() => {}}
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
                                                    <p>Artist: {appointment.artist.name}</p>
                                                    {/* <p>Service: {appointment.service.name}</p> */}
                                                    <p>Date: {date}</p>
                                                    <p>Time: {time}</p>
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
                                            {/* <p>Status: {appointment.status}</p> */}
                                        </div>
                                    </div>
                                }
                                image= {""}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}