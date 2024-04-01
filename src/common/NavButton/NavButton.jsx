import { useNavigate } from "react-router-dom";
import "./NavButton.css";

export const NavButton = ({ title, path }) => {

    const navigate = useNavigate();

    return (
        <div className="nav-button-design" onClick={() => navigate(path)}>
            {title}
        </div>
    )
}