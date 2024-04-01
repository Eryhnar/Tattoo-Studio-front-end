import { Route, Routes, Navigate } from 'react-router-dom';
import { Login } from "../Login/Login";
import { Home } from "../Home/Home";
import { Register } from '../Register/Register';
import { Profile } from '../Profile/Profile';
import { Services } from '../Services/Services';
import { Appointments } from '../Appointments/Appointments';
import { SecureRoute } from '../../common/SecureRoute/SecureRoute';
import { Admin } from '../Admin/Admin';
import { Catalogue } from '../Catalogue/Catalogue';

export const Body = () => {
    return (
        
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SecureRoute protMode="allow-logged-out" />}>
                <Route index element={<Login />} />
            </Route>
            <Route path="/register" element={<SecureRoute protMode="allow-logged-out" />}>
                <Route index element={<Register />} />
            </Route>
            <Route path="/profile" element={<SecureRoute protMode="allow-logged-in" />}>
                <Route index element={<Profile />} />
            </Route>
            <Route path="/services" element={<Services />} />
            <Route path="/appointments" element={<SecureRoute protMode="allow-logged-in" />}>
                <Route index element={<Appointments />} />
            </Route>
            <Route path="/admin" element={<SecureRoute protMode="allow-logged-in-admin" />}>
                <Route index element={<Admin />} />
            </Route>
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="*" element={<Navigate to={"/"} replace/>} />
        </Routes>
        
    )
}