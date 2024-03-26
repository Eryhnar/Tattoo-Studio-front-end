import React, { useState } from 'react'
import './App.css'
import { Body } from './pages/Body/Body'
import { Header } from '../src/common/Header/Header'
import { useEffect } from 'react'
import { decodeToken } from 'react-jwt'

export const TokenContext = React.createContext();

function App() {
  const [token, setToken] = useState(decodeToken(localStorage.getItem('token')) || null);

  // useEffect(() => {
  //   token === null 
  //     ? localStorage.removeItem('token') 
  //     // : localStorage.setItem('token', token);
  //     : null; //TODO check
  // }, [token]);
  useEffect(() => { //TODO check
    token === null && localStorage.removeItem('token');
  }, [token]);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <Header />
      <Body />
    </TokenContext.Provider>
  );
}

export default App
