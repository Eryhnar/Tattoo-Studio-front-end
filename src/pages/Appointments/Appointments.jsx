import { useEffect, useState } from "react";
import "./Appointments.css";
import { GetAppointmentsService } from "../../services/apiCalls";
import { CCard } from "../../common/CCard/CCard";
import { CInput } from "../../common/CInput/CInput";
import { CDropdown } from "../../common/CDropdown/CDropdown";

export const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [openNew, setOpenNew] = useState(true);
    const [newAppointment, setNewAppointment] = useState({
        customer: "",
        artist: "",
        service: "",
        date: "",
        // time: "",
    });

    useEffect(() => {
        const getAppointments = async () => {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await GetAppointmentsService(JSON.parse(localStorage.getItem("token")));
            setAppointments(response.data);
            console.log(response.data);
        };
        getAppointments();
    }, []);

    useEffect(() => {
        console.log(newAppointment);
    }, [newAppointment]);

    const inputHandler = (e) => {
        setNewAppointment((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="appointmentsDesign">
            { (openNew) 
                ?<CCard 
                    className= {"new-appointment"}
                    title= {""}
                    content= {
                        <>
                            <CDropdown
                                buttonClass="artist-selector"
                                dropdownClass="artist-dropdown"
                                title="artist"
                                // name="artist"
                                // placeholder="artist"
                                items={["Artist 1", "Artist 2", "Artist 3"]}
                                onChangeFunction={(e) => {inputHandler(e)}}
                            />
                            <CDropdown
                                buttonClass="service-selector"
                                dropdownClass="service-dropdown"
                                title="service"
                                // name="service"
                                // placeholder="service"
                                items={["Service 1", "Service 2", "Service 3"]}
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
                        </>
                    }
                    image= {""}
                />
                : null
            }
            <h1>Appointments</h1>
        </div>
    )
}