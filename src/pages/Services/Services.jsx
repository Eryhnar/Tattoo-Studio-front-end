import "./Services.css";
import { useState, useEffect } from "react";
import { GetServicesService } from "../../services/apiCalls";
import { CCard } from "../../common/CCard/CCard";
import { LoadingScreen } from "../../common/LoadingScreen/LoadingScreen";

export const Services = () => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [firstCall, setFirstCall] = useState(true);
    const [retries, setRetries] = useState(3);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await GetServicesService();
                if (response.success) {
                    setServices(response.data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
                setRetries(prevRetries => prevRetries - 1);
            }
        }
        retries > 0 && fetchServices();
    }, [retries]);

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
                                        key= {index}
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