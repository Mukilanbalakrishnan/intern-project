import{BrowserRouter,Route,Routes}from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar"
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
function Approuter() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="About" element={<About/>} />
        <Route path="Contact" element={<Contact/>} />
        <Route path="Login" element={<Login/>} />
        <Route path="Register" element={<Register/>} />
        
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Approuter