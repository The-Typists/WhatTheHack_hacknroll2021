import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Home from "./pages/Home";
import StatisticsPage from "./pages/StatisticsPage";
import GameRoom from "./pages/GameRoom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Table from "react-bootstrap/Table";
import NavItem from "react-bootstrap/esm/NavItem";
import "./index.css";

function App() {
  const [isLoggedin, setLoggedin] = useState(false);

  useEffect(() => {
    setLoggedin(!!localStorage.getItem("user"));
    console.log(localStorage.getItem("user"));
  }, []);

  function NavBar() {
    return (
      <Navbar
        style={{ marginBottom: "20px" }}
        bg="dark"
        variant="dark"
        className="loggedOutNav"
      >
        <Navbar.Brand>Code WPM</Navbar.Brand>
        <Nav className="mr-auto">
          {!isLoggedin && (
            <>
              <Nav.Item>
                <Nav.Link href="/signup"> Signup</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav.Item>
            </>
          )}
          {isLoggedin && (
            <>
              <Nav.Item>
                <Nav.Link href="/home"> Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/stats"> Statistics</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/game">Practice</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href=""
                  onClick={() => {
                    localStorage.clear();
                    setLoggedin(false);
                  }}
                >
                  Logout
                </Nav.Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Navbar>
    );
  }

  return (
    <div
      style={{
        fontFamily: "Consola",
      }}
    >
      <Router>
        <div>
          <NavBar />
          {!isLoggedin ? (
            <>
              <Switch>
                <Route path="/signup">
                  <SignupPage setLoggedin={setLoggedin} />
                </Route>
                <Route path="/">
                  <LoginPage setLoggedin={setLoggedin} />
                </Route>
              </Switch>
            </>
          ) : (
            <>
              <Switch>
                <Route path="/stats">
                  <StatisticsPage />
                </Route>
                <Route path="/game">
                  <GamePage />
                </Route>
                <Route exact path="/room/:code">
                  <GameRoom />
                </Route>
                <Route path="/">
                  <Home />;
                </Route>
              </Switch>
            </>
          )}
        </div>
      </Router>
    </div>
  );
}
export default App;
