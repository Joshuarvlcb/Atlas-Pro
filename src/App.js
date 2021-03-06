import Dashboard from "./Dashboard.jsx";
import Signup from "./components/Signup";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
function App() {
  return (
    <>
      <Dashboard />
      <Router>
        <Switch>
          <Route exact path="/slider" component={Dashboard} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
