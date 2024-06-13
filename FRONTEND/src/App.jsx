import './App.css';
import Dashbord from './components/admin/pages/Dashbord';
import Course from './components/admin/pages/Course';
import Interview from './components/admin/pages/Interview';
import Student from './components/admin/pages/Student';
import Company from './components/admin/pages/Company';
import AdminLogin from './components/admin/pages/AdminLogin';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AdminSecure from './components/admin/AdminSecure';

function App() {
  return (
    <Router>
      <Switch>


        <Route exact path="/admin/login">
          <AdminLogin />
        </Route>

        <Route exact path="/admin/dashboard">
          <AdminSecure>
            <Dashbord />
          </AdminSecure>
        </Route>

        <Route exact path="/admin/course">
          <AdminSecure>
            <Course />
          </AdminSecure>
        </Route>

        <Route exact path="/admin/interview">
          <AdminSecure>
            <Interview />
          </AdminSecure>
        </Route>

        <Route exact path="/admin/student">
          <AdminSecure>
            <Student />
          </AdminSecure>
        </Route>

        <Route exact path="/admin/company">
          <AdminSecure>
            <Company />
          </AdminSecure>
        </Route>

      </Switch>
    </Router>
  )
}

export default App;
