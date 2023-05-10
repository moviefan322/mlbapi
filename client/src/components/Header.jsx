import { Link } from "react-router-dom";
import baseball from "../assets/baseball.png";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={baseball} alt="baseball" height="36px" width="40px" />
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
