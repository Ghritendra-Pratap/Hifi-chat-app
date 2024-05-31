import Header from './components/header/Header'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
function App() {
  const token = localStorage.getItem("chat-user")

  return (
    
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element= {token ? <Home/>:<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/chat" element={<Home/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
