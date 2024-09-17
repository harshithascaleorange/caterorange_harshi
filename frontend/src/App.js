import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Corporatecart from './components/Cart';
import CorporateOrders from './components/CorporateOrders';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import Home from './components/home';
import StoreProvider from './services/contextapi_state_management/store';

function App() {
  const [user, setUser] = useState(null);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userProfile = localStorage.getItem('userProfile');
    if (token && userProfile) {
      setUser({
        token,
        ...JSON.parse(userProfile)
      });
      setIsGoogleLogin(true);
    }
  }, []);

  const handleSignIn = async (token, isGoogleLogin) => {
    console.log('entered App.js');
    console.log(token, isGoogleLogin);
    localStorage.setItem('accessToken', token);
    // localStorage.setItem('isGoogleLogin', isGoogleLogin);

    if (isGoogleLogin) {
      // Logic for handling Google login
      const decoded = jwtDecode(token);
      const profile = {
        name: decoded.name,
        email: decoded.email,
        profilePicture: decoded.picture // Google provides the picture URL in the token
      };
      localStorage.setItem('userProfile', JSON.stringify(profile));
      setUser({ token, ...profile });
      setIsGoogleLogin(true);
    } else {
      // Manual login logic (already existing)
      try {
        const response = await axios.get('http://localhost:7000/customer/info', {
          headers: { token }
        });
        const profile = {
          name: response.data.customer_name,
          phone: response.data.customer_phonenumber,
          email: response.data.customer_email,
          profilePicture: 'https://via.placeholder.com/50' // Placeholder or from backend
        };
        localStorage.setItem('userProfile', JSON.stringify(profile));
        setUser({ token, ...profile });
        setIsGoogleLogin(false);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }
  };

  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              user ? <Navigate to="/home" /> : <SignInForm onSignIn={handleSignIn} />
            }
          />
          <Route
            path="/"
            element={
              user ? <Navigate to="/home" /> : <SignUpForm onSignUp={handleSignIn} />
            }
          />
          <Route
            path="/home/*"
            element={
              user ? <Home user={user}/> : <Navigate to="/" />
            }
          />
          <Route
            path="/cart"
            element={user ? <Corporatecart user={user} /> : <Navigate to="/" />}
          />
          <Route
            path="/orders"
            element={user ? <CorporateOrders user={user} /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </StoreProvider>
  );
}

export default App;