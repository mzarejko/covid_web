import React, {Component} from 'react';
import './App.css';
import {Router, Switch, Route} from 'react-router-dom';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import MainPage from './pages/MainPage/MainPage';
import Shopping from './pages/Shopping/Shopping';
import {history} from './utils/history';
import PrivateRoute from './components/Routes/PrivateRoute';
import {urls} from './utils/urls';

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
                </Switch>
            </Router>
        </div>
        );
        
    }
}

export default App;
