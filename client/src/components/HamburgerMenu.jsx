import React from "react";
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

function HamburgerMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(reset());
    // setLoggedOut(true);
    dispatch(logout());
    navigate("/");
    localStorage.removeItem("user");
  };

  return (
    <section className="top-nav">
      <div></div>
      <input id="menu-toggle" type="checkbox" />
      <label className="menu-button-container" htmlFor="menu-toggle">
        <div className="menu-button"></div>
      </label>
      <ul className="menu">
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
            <li className="logout">
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
    </section>
  );
}

export default HamburgerMenu;
