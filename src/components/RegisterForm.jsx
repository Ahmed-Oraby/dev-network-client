import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Joi from 'joi';
import InputControl from './common/InputControl';
import { getTokenData, register } from '../services/authService';
import Loader from './common/Loader';
import Button from './common/Button';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });
  const [formError, setError] = useState({
    email: null,
    name: null,
    password: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const errorObj = {
    email: null,
    name: null,
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
      await register({ ...formData });
    } catch (error) {
      errorObj.email = error.message || 'An error occured, please try again.';
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
        Welcome to DevNet!
      </h2>
      <InputControl
        name="name"
        text="Name"
        placeholder="Enter your name"
        value={formData.name}
        error={formError.name}
        disabled={isLoading}
        onChange={handleChange}
      />
      <InputControl
        name="email"
        text="Email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        error={formError.email}
        disabled={isLoading}
        onChange={handleChange}
      />
      <InputControl
        name="password"
        text="Password"
        type="password"
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
      <Button
        type="submit"
        text="Register"
        variant="primary"
        disabled={isLoading}
      />
      <p className="mt-3 text-sm text-gray-700">
        Already have an account?{' '}
        <Link className="pl-1 text-blue-700 underline" to="/login">
          Login
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
    name: Joi.string().min(4).required(),
    password: Joi.string().min(5).required(),
  });

  return schema.validate(formData);
}
