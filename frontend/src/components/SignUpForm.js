import React, { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Use jwt-decode for decoding Google tokens
import { SignUp_customer, Login_google_auth } from '../services/contextapi_state_management/action/action';
import { StoreContext } from '../services/contextapi_state_management/store';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import SignInForm from './SignInForm';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SignUpForm = ({ closeModal , onSignUp }) => {
  const { state, dispatch } = useContext(StoreContext);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    await SignUp_customer(name, phone, email, password, confirmPassword, dispatch);
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const tokenId = credentialResponse.credential;
    const decodedToken = jwtDecode(tokenId);
    const { name, email } = decodedToken;

    await Login_google_auth(name, email, dispatch);
    onSignUp(tokenId, true); // Pass token and isGoogleLogin flag
  };

  const handleGoogleLoginError = () => {
    console.log('Google Login Failed');
  };

  const handleSignIn = (token, isGoogle) => {
    onSignUp(token, isGoogle); // Pass both token and isGoogle flag
  };

  useEffect(() => {
    if (state.data && !state.isError) {
      onSignUp(state.data, false); // Pass token and false for manual sign up
      console.log('signed up successfully');
    }
  }, [state.data, state.isError, onSignUp]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      {showLoginModal ? (
        <SignInForm closeModal={() => setShowLoginModal(false)} onSignIn={handleSignIn}/>
      ) : (
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-10 relative">
          {/* Cross button at the top-right */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            &times;
          </button>

          <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-4">
              <input
                type="text"
                id="name"
                className="w-1/2 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
              />
              <input
                type="text"
                id="phone"
                className="w-1/2 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
              />
            </div>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
           <div className="flex space-x-4">
          <div className='relative w-full'>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
               <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </button>
      </div>
     
      <div className='relative w-full'>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm Password"
            />
            <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                  </button>
            </div>
        </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>
            </div>
            <button
              className="w-full bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700 transition duration-200"
              type="submit"
              disabled={state.isLoading}
            >
              {state.isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
            {state.isError && <p className="text-red-500 mt-2">{state.errorMessage}</p>}
          </form>

          <div className="text-center mt-6">
            <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginError} />
          </div>

          <div className="text-center mt-4">
            <p className="text-sm">
              Already have an account?{' '}
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-orange-600 hover:text-orange-500 font-semibold"
              >
                Log In
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
