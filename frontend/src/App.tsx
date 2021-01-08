import React, {  useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Home from "./pages/Home";
import StatisticsPage from "./pages/StatisticsPage";
import GameRoom from "./pages/GameRoom";

function App() {
  const [isLoggedin, setLoggedin] = useState(false);

  useEffect(() => {
    setLoggedin(!!localStorage.getItem("user"));
    console.log(localStorage.getItem("user"));
  }, []);

  function NavBar() {
    return (
      <nav>
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
                <Link to="/stats">Statistics</Link>
              </li>
              <li>
                <Link to="/">Game</Link>
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
      </nav>
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
