import "./Services.css";
import { useState, useEffect } from "react";
import { GetServicesService } from "../../services/apiCalls";
import { CCard } from "../../common/CCard/CCard";

export const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await GetServicesService();
                setServices(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }

        }
        if (services.length === 0) {
            fetchServices();
        }
    }, []);

    return (
        <div className="services-design">
            <h1>Services</h1>
            {/* <p>Check out our services!</p> */}
            <div className="services">
                {services.map((service, index) => (
                    // <div key={index} className="service">
                    //     <h2>{service.name}</h2>
                    //     <p>{service.description}</p>
                    //     <p>{service.price}</p>
                    // </div>
                    <CCard 
                        className= {"service"}
                        title= {service.name}
                        content= {service.description}
                        image= {service.image}
                    />
                ))}
            </div>
        </div>
    );
}