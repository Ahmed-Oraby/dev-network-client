import React, { useState } from 'react';
import Loader from './common/Loader';
import InputControl from './common/InputControl';
import Button from './common/Button';

export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    company: '',
    location: '',
    status: '',
    bio: '',
    website: '',
    githubUserName: '',
    skills: '',
    social: {},
    education: [],
    experience: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const profileForm = [
    { name: 'location', text: 'Location' },
    { name: 'bio', text: 'Bio' },
    { name: 'status', text: 'Status' },
    { name: 'company', text: 'Company' },
    { name: 'website', text: 'Website' },
    { name: 'githubUserName', text: 'GitHub Username' },
    // { name: 'skills', text: 'Skills' },
  ];

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
  return (
    <form
      className="mx-auto my-10 flex max-w-5xl flex-col items-center justify-center rounded-md border-2 border-black py-6 px-3 shadow-lg sm:px-20"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-10 w-full border-b-2 border-gray-700 pb-2 text-center text-3xl text-gray-700">
        Update Your Profile
      </h2>

      <div className="w-full px-3 sm:px-20">
        {profileForm.map((item) => (
          <InputControl
            name={item.name}
            text={item.text}
            value={formData[item.name]}
            disabled={isLoading}
            onChange={handleChange}
          />
        ))}
      </div>

      <div className="mt-4">
        {isLoading && <Loader />}
        <Button type="submit" text="Update your profile" variant="primary" />
      </div>
    </form>
  );
}
