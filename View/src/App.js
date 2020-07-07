import React, { useState } from 'react';
import Nav from './Layouts/Nav'
import Login from './Layouts/Login'

function App() {
  const [isLogin, setIsLogin]  = React.useState(false);
  const [accountInfo, setAccountInfo] = React.useState(false);
  const navigation = (e, isLogin, accountInfo) => {
      setIsLogin(isLogin);
      setAccountInfo(accountInfo);
  };
  return (
    <div>
      {
          isLogin ? <Nav /> : <Login navigation={navigation}/>
      }
    </div>
  );
}


export default App;
