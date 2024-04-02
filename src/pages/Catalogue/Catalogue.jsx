import { useEffect, useState } from 'react';
import { GetCatalogueService } from '../../services/apiCalls';
import { CCard } from '../../common/CCard/CCard';
import "./Catalogue.css";

export const Catalogue = () => {
    const [catalogueEntries, setCatalogueEntries] = useState([]);

    useEffect(() => {
        const fetchCatalogueEntries = async () => {
            try {
                const response = await GetCatalogueService();
                setCatalogueEntries(response.data);
            } catch (error) {
                console.log(error);
            }

        }
        if (catalogueEntries.length === 0) {
            fetchCatalogueEntries();
        }
    }, []);

    return (
        <div className="catalogue-design">
            <div className="catalogue-body">
                <h1>Catalogue</h1>
                <div className="catalogue-entries">
                    {catalogueEntries.map((entry, index) => (
                        <CCard
                            className= {"catalogue-entry"}
                            title= {entry.name}
                            content= {entry.description}
                            image= {entry.photo}
                        />
                        
                    ))}
                </div>
            </div>
        </div>

    );
}