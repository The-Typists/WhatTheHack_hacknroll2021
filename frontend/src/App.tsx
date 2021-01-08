import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StatisticsPage from "./pages/StatisticsPage";
import { io } from "socket.io-client";

function App() {

  useEffect(() => {
    const socket = io("http://localhost:8080/");
    socket.on("connect", () => {
      console.log("Connected");
      socket.emit("join-room", { name: "name", id: "id", color: "color" });
      console.log("Sent");
    });
  }, []);
  const token = false;

  function NavBar() {
    return (
        <nav>
          <ul>
            {
              !token
                  ?
                  <>
                      <li>
                          <Link to="/">Login</Link>
                      </li>
                      <li>
                          <Link to="/signup">Signup</Link>
                      </li>
                  </>
                  :
                  <>
                      <li>
                          <Link to="/statistics">Statistics</Link>
                      </li>
                      <li>
                          <Link to="/">Game</Link>
                      </li>
                  </>
            }
          </ul>
        </nav>
    );
  }


  if(!token) {
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
        )
  }

  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/">
            <GamePage />
          </Route>
          <Route path="/statistics">
            <StatisticsPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
