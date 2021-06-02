import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import MovieDetail from './components/views/MovieDetail/MovieDetail'
import NavBar from './components/views/NavBar/NavBar';
import Footer from './components/views/Footer/Footer';
import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <div>
        <hr />
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)} />
        </Switch>
      </div>
    </Router>
  );
}


export default App;