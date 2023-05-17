import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaSignInAlt,
  FaUser,
  FaCalendarAlt,
  FaRegCaretSquareLeft,
  FaTicketAlt,
  FaBaseballBall,
  FaCoins,
} from "react-icons/fa";
import { logout, reset } from "../features/auth/authSlice";
import baseball from "../assets/baseball.png";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loggedOut, setLoggedOut] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(reset());
    // setLoggedOut(true);
    dispatch(logout());
    navigate("/");
    localStorage.removeItem("user");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={baseball} alt="baseball" height="36px" width="40px" />
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/">
            <FaBaseballBall /> Games
          </Link>
        </li>
        <li>
          <Link to="/schedule">
            <FaCalendarAlt /> Schedule
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/bets">
                <FaTicketAlt /> Bets
              </Link>
            </li>
            <li>
              <Link>
                <FaCoins />
                {" " + user.accountBalance.toFixed(2)}
              </Link>
            </li>
            <li>
              <button onClick={onLogout} className="btn-none">
                <FaRegCaretSquareLeft className="bigger" /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Log In
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
