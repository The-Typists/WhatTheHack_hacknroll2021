import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StatisticsPage from "./pages/StatisticsPage";

function App() {
    return (
        <Router>
            <div>
                <NavBar />
                <Switch>
                    <Route path="/game">
                        <GamePage/>
                    </Route>
                    <Route path="/signup">
                        <SignupPage />
                    </Route>
                    <Route path="/statistics">
                        <StatisticsPage />
                    </Route>
                    <Route path="/">
                        <LoginPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function NavBar() {
    return <nav>
        <ul>
            <li>
                <Link to="/">Login</Link>
            </li>
            <li>
                <Link to="/signup">Signup</Link>
            </li>
            <li>
                <Link to="/statistics">Statistics</Link>
            </li>
            <li>
                <Link to="/game">Game</Link>
            </li>
        </ul>
    </nav>;
}

export default App;
