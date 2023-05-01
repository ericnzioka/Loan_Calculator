import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import LoanForm from './form';
import LoanCalculator from './LoanCalculator';


import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const handleLoginSuccess = (response) => {
    setLoggedIn(true);
    setUserProfile(response.profileObj);
  };

  const handleLoginFailure = (response) => {
    console.log('Login failed:', response);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {loggedIn ? (
          <p>Welcome, {userProfile.name}!</p>
        ) : (
          <GoogleOAuthProvider  clientId="917893576603-fnbua3mbmeo5qfo53vetdnqa52119tbe.apps.googleusercontent.com">
            <GoogleLogin
              buttonText="Login with Google"
              onSuccess={handleLoginSuccess}
              onFailure={handleLoginFailure}
              cookiePolicy={'single_host_origin'}
            />
          </GoogleOAuthProvider>
        )}
      <main>
        <LoanForm />
        <LoanCalculator />
      </main>
      </header>
    </div>
  );
}

export default App;
