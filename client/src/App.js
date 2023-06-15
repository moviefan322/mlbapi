import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Schedule from "./pages/Schedule";
import PrivateRoute from "./components/PrivateRoute";
import Bets from "./pages/Bets";
import Box from "./pages/Box";
import Tester from "./components/Tester";
import Leaderboard from "./pages/Leaderboard";

function App() {
  if (typeof window !== "undefined") {
    window.React = React;
  }

  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/bets" element={<PrivateRoute />}>
              <Route path="/bets" element={<Bets />} />
            </Route>
            <Route path="/boxscore/:gamePk" element={<Box />} />
            <Route path="/Leaderboard" element={<Leaderboard />} />
            <Route path="/*" element={<Home />} />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </>
  );
}

export default App;
