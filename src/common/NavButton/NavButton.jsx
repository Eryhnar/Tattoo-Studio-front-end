import { useNavigate } from "react-router-dom";
import "./NavButton.css";

export const NavButton = ({ title, path }) => {

    const navigate = useNavigate();

    return (
        <div className="navButtonDesign" onClick={() => navigate(path)}>
            {title}
        </div>
    )
}