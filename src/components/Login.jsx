import React, { useState } from 'react';
import { signUpUser, loginUser } from '../services/storage.js'; 
import logo from '../assets/Weather.gif';

function Login({ onAuthenticate }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormToggle = (login) => {
    setIsLogin(login);
    setEmail('');
    setPassword('');
    setUsername('');
    setError('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (!email || !password) {
        setError('Email and password are required');
        return;
      }
  
      const result = loginUser(email, password);
      if (result.success) {
        setError('');
        console.log(result.message);
        onAuthenticate(true);
      } else {
        setError(result.message);
      }
    } else {
      if (!username || !email || !password) {
        setError('All fields are required');
        return;
      }
  
      const result = signUpUser(username, email, password);
      if (result.success) {
        setError('');
        console.log(result.message);
        onAuthenticate(true);
      } else {
        setError(result.message);
      }
    }
  };

  return (
    <div className='flex flex-col-reverse md:flex-row bg-gradient-to-r from-[#111015] via-[#1E1E1E] to-[#201a35] background-animate'>
      <div className=' md:w-[50%] bg-blue-500 flex md:justify-center md:items-center p-6 md:p-0'>
        <img src={logo} alt="Logo" className='w-full md:w-auto '/>
      </div>
      <div className='LoginForm h-screen w-full md:w-[50%] flex items-center justify-center p-6 md:p-0'>
        <div className='bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding w-full md:w-[30rem] h-auto rounded-lg p-6'>
          <div className='w-full px-3 flex items-center justify-center gap-2 font-bold text-white mb-4'>
            <button
              className={`rounded-lg w-1/2 px-4 py-2 ${isLogin ? 'bg-blue-500 hover:bg-blue-600' : 'bg-transparent hover:bg-gray-800'}`}
              onClick={() => handleFormToggle(true)}
            >
              Login
            </button>
            <button
              className={`rounded-lg w-1/2 px-4 py-2 ${!isLogin ? 'bg-blue-500 hover:bg-blue-600' : 'bg-transparent hover:bg-gray-800'}`}
              onClick={() => handleFormToggle(false)}
            >
              Sign Up
            </button>
          </div>
          <form className='flex flex-col gap-4' onSubmit={handleFormSubmit}>
            {!isLogin && (
              <div>
                <label className='block text-white text-sm font-bold mb-2' htmlFor='username'>
                  Username
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-[#111015] leading-tight focus:outline-none focus:shadow-outline bg-transparent'
                  id='username'
                  type='text'
                  placeholder='Enter your username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            )}
            <div>
              <label className='block text-white text-sm font-bold mb-2' htmlFor='email'>
                Email
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-[#111015] leading-tight focus:outline-none focus:shadow-outline bg-transparent text-white'
                id='email'
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className='block text-white text-sm font-bold mb-2' htmlFor='password'>
                Password
              </label>
              <div className='relative'>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-[#111015] leading-tight focus:outline-none focus:shadow-outline bg-transparent text-white'
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type='button'
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 ${showPassword ? 'text-blue-500' : 'text-gray-500'}`}
                  onClick={togglePasswordVisibility}
                >
                  <svg
                    className='h-5 w-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.264.946-.675 1.835-1.227 2.647M15 12a3 3 0 01-6 0 3 3 0 016 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M2.458 12a10.012 10.012 0 011.227-2.647m0 0A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7 .264.946.675 1.835 1.227 2.647M2.458 12a9.953 9.953 0 001.227 2.647m16.857 0A9.953 9.953 0 0112 19c-4.477 0-8.268-2.943-9.542-7'
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <button
                className='rounded-full px-4 py-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold focus:outline-none focus:shadow-outline'
                type='submit'
              >
                {isLogin ? 'Log In' : 'Sign Up'}
              </button>
            </div>
            {error && <p className='text-red-500 text-sm'>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
