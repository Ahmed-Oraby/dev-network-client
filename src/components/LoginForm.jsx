import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Joi from 'joi';
import InputControl from './common/InputControl';
import { post } from '../services/httpService';
import { setAuthToken, getTokenData } from '../services/authService';
import Loader from './common/Loader';
import Button from './common/Button';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formError, setError] = useState({
    email: null,
    password: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const errorObj = {
    email: null,
    password: null,
  };

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = validateForm(formData);
    if (error) {
      for (let item of error.details) {
        errorObj[item.path[0]] = item.message;
      }
      setError(errorObj);
      return;
    }

    submitForm();
  }

  async function submitForm() {
    setIsLoading(true);

    try {
      const { token } = await post('/users/login', { ...formData });
      setAuthToken(token);
      window.location.replace('/dashboard');
    } catch (error) {
      errorObj.email = 'An error occured, please try again.';
    }
    setIsLoading(false);
    setError(errorObj);
  }

  const tokenData = getTokenData();
  if (tokenData) return <Navigate to="/dashboard" replace />;

  return (
    <form
      className="mx-auto mt-10 flex max-w-sm flex-col items-center justify-center rounded-md border-2 border-black p-6 shadow-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-10 w-full border-b-2 border-gray-700 pb-2 text-center text-3xl text-gray-700">
        Welcome Back!
      </h2>
      <InputControl
        name="email"
        text="Email"
        placeholder="Enter your email"
        value={formData.email}
        error={formError.email}
        disabled={isLoading}
        onChange={handleChange}
      />
      <InputControl
        name="password"
        text="Password"
        placeholder="Enter your password"
        value={formData.password}
        error={formError.password}
        disabled={isLoading}
        onChange={handleChange}
      />
      {isLoading && (
        <div className="mt-4">
          <Loader />
        </div>
      )}
      <Button type="submit" text="Login" />
      <p className="mt-3 text-sm text-gray-700">
        Don't have an account?{' '}
        <Link className="pl-1 text-blue-700 underline" to="/register">
          Register
        </Link>
      </p>
    </form>
  );
}

function validateForm(formData) {
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(5).required(),
  });

  return schema.validate(formData);
}
