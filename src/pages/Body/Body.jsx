import { Route, Routes } from 'react-router-dom';
import { Login } from "../Login/Login";
import { Home } from "../Home/Home";
import { Register } from '../Register/Register';
import { Profile } from '../Profile/Profile';
import { Services } from '../Services/Services';

export const Body = () => {
    return (
        
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/services" element={<Services />} />
            <Route path="*" element={<Home />} />
        </Routes>
        
    )
}