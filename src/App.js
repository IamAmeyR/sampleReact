import React from 'react';
import './App.css';
import Login from './Components/Login';
import { Route, Switch } from "react-router-dom";
import Dashboard from './Components/Dashboard';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;``