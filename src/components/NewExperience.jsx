import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addExperience } from '../services/profileService';
import Alert from './common/Alert';
import Button from './common/Button';
import InputControl from './common/InputControl';
import Loader from './common/Loader';

const initialExperienceForm = {
  company: '',
  title: '',
  from: new Date().toLocaleDateString('en-CA'),
  to: new Date().toLocaleDateString('en-CA'),
  description: '',
  current: false,
};

const experienceForm = [
  { name: 'company', text: 'Company Name*' },
  { name: 'title', text: 'Title*' },
  { name: 'description', text: 'Description' },
  { name: 'from', text: 'From', type: 'date' },
  { name: 'to', text: 'To', type: 'date' },
];

export default function NewExperience() {
  const [experienceData, setExperienceData] = useState(initialExperienceForm);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  function handleChange(e) {
    setExperienceData({
      ...experienceData,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    submitForm();
  }

  async function submitForm() {
    setIsLoading(true);

    let formError = '';

    try {
      const newProfile = await addExperience(experienceData);
      navigate(`/profile/${newProfile.user._id}`);
    } catch (error) {
      console.log(error);
      formError = error.message || 'An error occured, please try again.';
    }
    setIsLoading(false);
    setError(formError);
  }

  return (
    <form
      className="mx-auto my-10 flex max-w-3xl flex-col items-center justify-center rounded-md border-2 border-black py-6 px-3 shadow-lg sm:px-10"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-10 w-full border-b-2 border-gray-700 pb-2 text-center text-3xl text-gray-700">
        Add New Experience
      </h2>
      <div className="w-full px-3 sm:px-10">
        {experienceForm.map((item, index) => (
          <InputControl
            key={index}
            name={item.name}
            text={item.text}
            type={item.type || 'text'}
            value={experienceData[item.name]}
            disabled={isLoading}
            onChange={handleChange}
          />
        ))}
        <div className="mt-4 flex items-center p-2">
          <input
            className="mr-2 h-4 w-4"
            id="current"
            name="current"
            checked={experienceData.current}
            type="checkbox"
            disabled={isLoading}
            onChange={handleChange}
          />{' '}
          <label
            htmlFor="current"
            className="text-base font-bold text-gray-700"
          >
            Currently Working
          </label>
        </div>
      </div>

      <div className="mt-4 text-center">
        {isLoading && <Loader />}
        {error && <Alert variant="danger" text={error} />}
        <Button
          type="submit"
          text="Add Experience"
          variant="primary"
          disabled={isLoading}
        />
      </div>
    </form>
  );
}
