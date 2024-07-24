import { Link,NavLink } from "react-router-dom";
import "./Navbar.css";
import img1 from "../image/logo.png"
function Navbar() {
  return (
    <div className="whole">
    <nav className="wrapper-nav">
      <div>
        <NavLink to="/">
        <img src={img1} alt="" />
        </NavLink>
      </div>
      <div className="wrapper-Link">
        <Link to="/">Home</Link>
        <Link to="About">About</Link>
        <Link to="Contact">Contact</Link>
        <Link to="Login">Login</Link>
      </div>
    </nav>
    </div>
  )
}

export default Navbar