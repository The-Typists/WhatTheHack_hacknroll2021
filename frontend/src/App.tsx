import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Home from "./pages/Home";
import StatisticsPage from "./pages/StatisticsPage";

function App() {
  const token = false;

  function NavBar() {
    return (
      <nav>
        <ul>
          {!token ? (
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
                <Link to="/statistics">Statistics</Link>
              </li>
              <li>
                <Link to="/">Game</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    );
  }

  return <Home />;
  if (!token) {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route path="/signup">
              <SignupPage />
            </Route>
            <Route path="/">
              <LoginPage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div>
        <NavBar />
        {!token ? (
          <>
            <Switch>
              <Route path="/signup">
                <SignupPage />
              </Route>
              <Route path="/">
                <LoginPage />
              </Route>
            </Switch>
          </>
        ) : (
          <>
            <Switch>
              <Route path="/stats">
                <StatisticsPage />
              </Route>
              <Route path="/">
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
