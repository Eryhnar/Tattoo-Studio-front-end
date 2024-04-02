import "./Services.css";
import { useState, useEffect } from "react";
import { GetServicesService } from "../../services/apiCalls";
import { CCard } from "../../common/CCard/CCard";
import { LoadingScreen } from "../../common/LoadingScreen/LoadingScreen";

export const Services = () => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await GetServicesService();
                setServices(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchServices();
    }, []);

    return (
        <>
            {isLoading 
                ? 
                    <LoadingScreen />
                : 
                    <div className="services-design">
                            <h1>Services</h1>
                        <div className="services-banner"></div>
                        {/* <p>Check out our services!</p> */}
                        <div className="services-body">
                            <div className="services">
                                {services.map((service, index) => (
                                    <CCard
                                        className= {"service"}
                                        title= {service.name}
                                        content= {service.description}
                                        image= {service.photo}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}