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
        <div className="homeDesign">
            {/* <div className="homeDesign">
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
            </div> */}
            <h1>Inkdin</h1>
            <section>
                <div>
                    <img src="https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b" alt="tattoo" />
                    <h2>Show your personality</h2>
                    <p>We offer the best selection of piercings and the best artists to let you express yourself freely</p>
                </div>
                <article>
                    <h2>The best tattoo artists in San Francisco</h2>
                    <p>
                        Our artists are the best in the world. We have artists specialized in many 
                        different styles from tribal, fine line, watercolor to UV tattoos
                    </p>
                </article>
                <article>
                    <h2>Right in the heart of San Francisco</h2>
                    <p>
                        Our studio is located in the heart of San Francisco. 
                        It is designed to make you feel comfortable and relaxed during your time with us.
                    </p>
                </article>
                <p>We are open from Monday to Saturday from 10:00 to 20:00</p>
                <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d8919.84982051217!2d-122.42486454269346!3d37.77496479366142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1stattoo!5e0!3m2!1ses!2ses!4v1711750331416!5m2!1ses!2ses" width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </section>
        </div>
        // </div>
    );
}