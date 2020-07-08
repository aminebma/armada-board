import React, { useState } from 'react';
import Nav from './Layouts/Nav'
import Login from './Layouts/Login'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
            <Route path="/login" component={Login}/>
            {localStorage.getItem('jwt')?<Route path='/' component={Nav}/>:<Redirect to={"/login"}/>}
        </Switch>
      </BrowserRouter>
      </div>
  );
}


export default App;
