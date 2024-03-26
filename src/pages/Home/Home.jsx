import { CDropdown } from "../../common/CDropdown/CDropdown";
import "./Home.css";

export const Home = () => {
    return (
        // <div className="viewDesign">
        <>
            <div className="homeDesign">
                <CDropdown 
                    title="Dropdown" 
                    items={["patata", "cebolla", "tomate", "lechuga", "zanahoria"]}
                />
                This is Home
            </div>
        </>
        // </div>
    );
}