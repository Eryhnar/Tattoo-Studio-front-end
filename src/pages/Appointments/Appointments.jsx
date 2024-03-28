import { useEffect, useState, useContext } from "react";
import "./Appointments.css";
import { CreateAppointmentService, GetAppointmentsService } from "../../services/apiCalls";
import { CCard } from "../../common/CCard/CCard";
import { CInput } from "../../common/CInput/CInput";
import { CDropdown } from "../../common/CDropdown/CDropdown";
import { CButton } from "../../common/CButton/CButton";
import { TokenContext } from "../../App";

export const Appointments = () => {
    const { token, setToken } = useContext(TokenContext);
    const [ appointments, setAppointments ] = useState([]);
    const [ openNew, setOpenNew ] = useState(false);
    const [ newAppointment, setNewAppointment ] = useState({
        customerId: "",
        artistId: "",
        serviceId: "",
        date: "",
        // time: "",
    });
    const [ msgError, setMsgError ] = useState("");
    const [ status, setStatus ] = useState("pending");

    useEffect(() => {
        const getAppointments = async () => {
            const token = localStorage.getItem("token");
            // console.log(token);
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
    }, []);

    useEffect(() => { //TODO remove
        console.log("newAppointment", newAppointment);
        // console.log("token", token)
    }, [newAppointment]);

    const inputHandler = (e) => {
        let value = e.target.value;
        if (e.target.name === "date") {
            value = value.replace("T", " ");
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
            return response.data;
        } catch (error) {
            setMsgError(error.message);
        }
    }

    return (
        <div className="appointmentsDesign">
            <div className="appointment-status-selectors">
                <CButton
                    className={`appointment-status-selector ${status === 'pending' ? 'active' : ''}`}
                    title="Pending"
                    onClickFunction={() => setStatus("pending")}
                />
                <CButton
                    className={`appointment-status-selector ${status === 'done' ? 'active' : ''}`}
                    title="Done"
                    onClickFunction={() => setStatus("done")}
                />
                <CButton
                    className={`appointment-status-selector ${status === 'cancelled' ? 'active' : ''}`}
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
                                // name="artist"
                                // placeholder="artist"
                                // items={["Artist 1", "Artist 2", "Artist 3"]}
                                items={[
                                    { id: 1, name: "Artist 1" },
                                    { id: 2, name: "Artist 2" },
                                    { id: 3, name: "Artist 3" }
                                ]}
                                onChangeFunction={(e) => {inputHandler(e)}}
                            />
                            <CDropdown
                                buttonClass="service-selector"
                                dropdownClass="service-dropdown"
                                title="serviceId"
                                // name="service"
                                // placeholder="service"
                                // items={["Service 1", "Service 2", "Service 3"]}
                                items={[
                                    { id: 1, name: "Service 1" },
                                    { id: 2, name: "Service 2" },
                                    { id: 3, name: "Service 3" }
                                ]}
                                onChangeFunction={(e) => {inputHandler(e)}}
                            />

                            <CInput
                                className={"date-time"}
                                type="datetime-local"
                                placeholder="Date"
                                name="date"
                                disabled=""
                                value={newAppointment.date || ""} 
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
                            {/* <CInput
                                className={"date-time"}
                                type="date"
                                placeholder="Date"
                                name="date"
                                disabled=""
                                value={newAppointment.date || ""} 
                                onChange={() => {}}
                            /> */}
                            {/* <CInput
                                type="time"
                                name="time"
                                placeholder="Time"
                                value= {newAppointment.time || ""}
                                onChange={() => {}}
                            /> */}
                        </div>
                    }
                    image= {""}
                />
                : <CButton 
                    className="new-appointment-button"
                    title="+"
                    onClickFunction={() => setOpenNew(true)}
                />
            }
            {/* <h1>Appointments</h1> */}
            <div className="appointments">
                {appointments.map((appointment, index) => (
                    <CCard 
                        key={appointment.id}
                        className= {"appointment"}
                        title= {""}
                        content= {
                            <div className="appointment-content">
                                <p>Artist: {appointment.artist.name}</p>
                                <p>Service: {appointment.service.name}</p>
                                {appointment.catalogue && 
                                    <div className="appointment-content-catalogue">
                                        <p>Catalogue: {appointment.catalogue.name}</p>
                                        <p>Price: {appointment.catalogue.price}</p>
                                        <div className="appointment-img">
                                            <img src={appointment.catalogue.afterImage} alt="catalogue" />
                                        </div>
                                    </div>
                                }
                                <p>Date: {appointment.date.replace("T", " ")}</p>
                                <p>Status: {appointment.status}</p>
                            </div>
                        }
                        image= {""}
                    />
                ))}
            </div>
        </div>
    )
}