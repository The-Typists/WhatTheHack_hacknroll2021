import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Home from "./pages/Home";
import StatisticsPage from "./pages/StatisticsPage";
import GameRoom from "./pages/GameRoom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import NavItem from "react-bootstrap/esm/NavItem";



function App() {
  const [isLoggedin, setLoggedin] = useState(false);

  useEffect(() => {
    setLoggedin(!!localStorage.getItem("user"));
    console.log(localStorage.getItem("user"));
  }, []);

  function NavBar() {

    const loggedOut = (
      <Navbar bg="light">
        <Nav className="mr-auto">
          <Nav.Item>
            <Nav.Link href="/signup"> Signup</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>)


    const loggedIn = (
      <Navbar bg="light">
        <Nav className="mr-auto">
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
            <Nav.Link href="" onClick={() => {
              localStorage.clear();
              setLoggedin(false);
            }}>Logout</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>)

    return (
        <ul>
          {!isLoggedin ? loggedOut : loggedIn}
        </ul>
    );
  }


  return (
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
                <Route exact path="/">
                  <Home />;
                    <GamePage />
                </Route>
              </Switch>
            </>
          )}
      </div>
    </Router>
  );
}
export default App;
