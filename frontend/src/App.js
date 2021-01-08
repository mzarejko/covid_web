import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Register from './pages/Authentication/Register.js';
import Login from './pages/Authentication/Login.js';
import MainPage from './pages/MainPage/MainPage.js';

class App extends Component {
    render(){
        return (
            <>
                <Router>
                    <Switch>
                        <Route path='/register' exact component={Register} />
                        <Route path='/' exact component={Login} />
                        <Route path='/home' exact component={MainPage} />
                    </Switch>
                </Router>
            </>
        );
        
    }
}

export default App;
