import { CDropdown } from "../../common/CDropdown/CDropdown";
import { GetServicesService } from "../../services/apiCalls";
import "./Home.css";
import { useEffect, useState } from "react";

export const Home = () => {
    const [services, setServices] = useState([]);
    const [artists, setArtists] = useState([]);
    const [catalogues, setCatalogues] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            const response = await GetServicesService();
            const data = response.data;
            setServices(data);

            setTimeout(() => {
                console.log("response",response);
                console.log("data",data);
                console.log("services",services);
            }, 2000);
        };
        if (services.length === 0) {
            fetchServices();
        }

        
    }, []);
    
    return (
        // <div className="viewDesign">
        <>
            <div className="homeDesign">
                <CDropdown 
                    buttonClass="dropdown"
                    dropdownClass="dropdown-content"
                    title="Dropdown" 
                    items={["patata", "cebolla", "tomate", "lechuga", "zanahoria"]}
                />
                This is Home
                <CDropdown
                    buttonClass="dropdown"
                    dropdownClass="dropdown-content"
                    title="Services"
                    items={services}
                    onChangeFunction={()=>{}}
                />
            </div>
        </>
        // </div>
    );
}