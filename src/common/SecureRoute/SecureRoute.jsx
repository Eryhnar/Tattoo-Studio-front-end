import React, { useEffect } from 'react';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import { TokenContext } from '../../App';

export const SecureRoute = ({ childElement, protMode }) => {
    const { token, setToken } = React.useContext(TokenContext);
    const navigate = useNavigate();
    
    // switch (protMode) {
    //     case 'allow-logged-out':
    //         !token ? null : navigate("/");
    //         return null;
    //     case 'allow-logged-in':
    //         return <Route {...rest} render={(props) => token ? <Component {...props} /> : <Navigate to={"/"} replace/>} />;
    //     case 'allow-logged-in-admin':
    //         return <Route {...rest} render={(props) => token && token.role.includes("admin") ? <Component {...props} /> : <Navigate to={"/"} replace/>} />;
    //     default:
    //         return <Redirect to="/" />;
    // }

    useEffect(() => {
        switch (protMode) {
            case 'allow-logged-out':
                !token ? null : navigate("/");
            case 'allow-logged-in':
                token ? null : navigate("/");
            case 'allow-logged-in-admin':
                token && token.role.includes("admin") ? null : navigate("/");
            default:
                navigate("/");
        }
    }, []);
    // switch (protMode) {
    //     case 'allow-logged-out':
    //         !token ? navigate()
    //         return <Route {...rest} render={(props) => !token ? <Component {...props} /> : <Navigate to={"/"} replace/>} />;
    //     case 'allow-logged-in':
    //         return <Route {...rest} render={(props) => token ? <Component {...props} /> : <Navigate to={"/"} replace/>} />;
    //     case 'allow-logged-in-admin':
    //         return <Route {...rest} render={(props) => token && token.role.includes("admin") ? <Component {...props} /> : <Navigate to={"/"} replace/>} />;
    //     default:
    //         return <Redirect to="/" />;
    // }
}