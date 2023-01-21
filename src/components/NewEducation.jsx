import React, { useState } from 'react';
import Alert from './common/Alert';
import Button from './common/Button';
import InputControl from './common/InputControl';
import Loader from './common/Loader';

const initialEducationForm = {
  school: '',
  specialization: '',
  degree: '',
  grade: '',
  from: new Date().toLocaleDateString('en-CA'),
  to: new Date().toLocaleDateString('en-CA'),
  description: '',
  current: false,
};

const EducationForm = [
  { name: 'school', text: 'School Name' },
  { name: 'specialization', text: 'Specialization' },
  { name: 'degree', text: 'Degree' },
  { name: 'grade', text: 'Grade' },
  { name: 'description', text: 'Description' },
  { name: 'from', text: 'From', type: 'date' },
  { name: 'to', text: 'To', type: 'date' },
];

export default function NewEducation() {
  const [educationData, setFormData] = useState(initialEducationForm);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    // if (e.target.type === 'checkbox') {
    //   setFormData({
    //     ...educationData,
    //     [e.target.name]: e.target.checked,
    //   });
    // }
    setFormData({
      ...educationData,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(educationData);
    // submitForm();
  }

  return (
    <form
      className="mx-auto my-10 flex max-w-3xl flex-col items-center justify-center rounded-md border-2 border-black py-6 px-3 shadow-lg sm:px-10"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-10 w-full border-b-2 border-gray-700 pb-2 text-center text-3xl text-gray-700">
        Add New Education
      </h2>
      <div className="w-full px-3 sm:px-10">
        {EducationForm.map((item, index) => (
          <InputControl
            key={index}
            name={item.name}
            text={item.text}
            type={item.type || 'text'}
            value={educationData[item.name]}
            onChange={handleChange}
          />
        ))}
        <div className="mt-4 flex items-center">
          <input
            className="mr-2 h-4 w-4"
            id="current"
            name="current"
            checked={educationData.current}
            type="checkbox"
            disabled={isLoading}
            onChange={handleChange}
          />{' '}
          <label
            htmlFor="current"
            className="text-base font-bold text-gray-700"
          >
            Currently Studying
          </label>
        </div>
      </div>

      <div className="mt-4 text-center">
        {isLoading && <Loader />}
        {error && <Alert variant="danger" text={error} />}
        <Button type="submit" text="Update your profile" variant="primary" />
      </div>
    </form>
  );
}
