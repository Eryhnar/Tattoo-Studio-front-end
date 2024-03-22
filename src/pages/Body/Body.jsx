import { Route, Router } from 'react-router-dom';
import { Home } from "../Login/Login";

export const Body = () => {
    return (
        <>
            <Router>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Router>
        </>
    )
}