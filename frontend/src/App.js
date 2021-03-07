import React, {Component} from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import MainPage from './pages/MainPage/MainPage';
import Shopping from './pages/Shopping/Shopping';
import Profile from './pages/profile/profile';
import {history} from './utils/history';
import PrivateRoute from './components/Routes/PrivateRoute';
import {urls} from './utils/urls';
import './App.css';

class App extends Component {
    render(){
        return (
        <div>
            <Router history = {history}>
                <Switch>
                    <Route exact path={urls.LOGIN} component={Login} />
                    <Route path={urls.REGISTER} component={Register} />
                    <PrivateRoute path={urls.HOME} component={MainPage}  />
                    <PrivateRoute path={urls.SHOPPING} component={Shopping} />
                    <PrivateRoute path={urls.PROFILE} component={Profile} />
                </Switch>
            </Router>
        </div>
        );
        
    }
}

export default App;
