import React, { useState } from 'react'
import './App.css'
import { Body } from './pages/Body/Body'
import { Header } from '../src/common/Header/Header'
import { useEffect } from 'react'

export const TokenContext = React.createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    token === null 
      ? localStorage.removeItem('token') 
      : localStorage.setItem('token', token);
  }, [token]);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <Header />
      <Body />
    </TokenContext.Provider>
  );
}

export default App
