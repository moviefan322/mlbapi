import { FaSignInAlt, FaUser, FaCalendarAlt } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import baseball from "../assets/baseball.png";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
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
          <Link to="/schedule">
            <FaCalendarAlt /> Schedule
          </Link>
        </li>
        {user ? (
          <li>
            <button onClick={onLogout} className="btn">
              <CgLogOut /> Logout
            </button>
          </li>
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
