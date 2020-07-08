import React, { useState } from 'react';
import Nav from './Layouts/Nav'
import Login from './Layouts/Login'
import DBAdmin from './Admin/DBAdmin'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/admin" component={DBAdmin} />
          <Route path="/" component={Nav} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}


export default App;
