import "./Header.css";
import { NavButton } from "../NavButton/NavButton";

export const Header = () => {
    return (
        <div className="headerDesign">
            {/* This is Header */}
            <div className="headerLeft">
                <NavButton title="Home" path="/" />
            </div>
            <div className="headerRight">
                <NavButton title="Login" path="/login" />
            </div>
        </div>
    );
}