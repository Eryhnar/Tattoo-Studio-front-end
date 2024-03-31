import { Route, Routes, Navigate } from 'react-router-dom';
import { Login } from "../Login/Login";
import { Home } from "../Home/Home";
import { Register } from '../Register/Register';
import { Profile } from '../Profile/Profile';
import { Services } from '../Services/Services';
import { Appointments } from '../Appointments/Appointments';
import { SecureRoute } from '../../common/SecureRoute/SecureRoute';

export const Body = () => {
    return (
        
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={
                <SecureRoute protMode="allow-logged-out"> 
                <Login />
                </SecureRoute>
            } />
            <Route path="/register" element={
                <SecureRoute protMode="allow-logged-out">
                    <Register />
                </SecureRoute>
            } />
            <Route path="/profile" element={
                <SecureRoute protMode="allow-logged-in">
                    <Profile />
                </SecureRoute>
            } />
            <Route path="/services" element={<Services />} />
            <Route path="/appointments" element={
                <SecureRoute protMode="allow-logged-in">
                    <Appointments />
                </SecureRoute>
            } />
            <Route path="*" element={<Navigate to={"/"} replace/>} />
        </Routes>
        
    )
}