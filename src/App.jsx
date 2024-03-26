import React, { useState } from 'react'
import './App.css'
import { Body } from './pages/Body/Body'
import { Header } from '../src/common/Header/Header'

export const TokenContext = React.createContext();

function App() {
  const [token, setToken] = useState(null) // Add this line

  return (
    < TokenContext.Provider value={{ token, setToken }}> {/* Add this line */}
      <Header />
      <Body />
    </ TokenContext.Provider> /* Add this line */
  )
}

export default App
