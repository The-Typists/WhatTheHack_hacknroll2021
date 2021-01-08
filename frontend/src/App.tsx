import React, {  useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Home from "./pages/Home";
import StatisticsPage from "./pages/StatisticsPage";
import GameRoom from "./pages/GameRoom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';



function App() {
  const [isLoggedin, setLoggedin] = useState(false);

  useEffect(() => {
    setLoggedin(!!localStorage.getItem("user"));
    console.log(localStorage.getItem("user"));
  }, []);

  function NavBar() {
    return (
      <Navbar>
        <ul>
          {!isLoggedin ? (
            <>
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          ) : (
            <>
            <li>
                <Link to="/home">Home</Link>
            </li>
              <li>
                <Link to="/stats">Statistics</Link>
              </li>
              <li>
                <Link to="/game">Practice</Link>
              </li>
              <li>
                <Link
                  to=""
                  onClick={() => {
                    localStorage.clear();
                    setLoggedin(false);
                  }}
                >
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </Navbar>
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
                <Route path="/">
                    <Home />;
                </Route>
            </Switch>
          </>
        )}
      </div>
    </Router>
  );
}
export default App;
