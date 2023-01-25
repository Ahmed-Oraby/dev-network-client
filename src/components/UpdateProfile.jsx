import React, { useEffect, useState } from 'react';
import Loader from './common/Loader';
import InputControl from './common/InputControl';
import Button from './common/Button';
import Alert from './common/Alert';
import { createProfile } from '../services/profileService';
import { useLocation, useNavigate } from 'react-router-dom';

const initialProfileForm = {
  bio: '',
  location: '',
  status: '',
  skills: '',
  company: '',
  website: '',
  githubUserName: '',
  github: '',
  linkedin: '',
  twitter: '',
  youtube: '',
};

const profileForm = [
  { name: 'bio', text: 'Bio*', placeholder: 'ex: A front-end developer' },
  { name: 'location', text: 'Location*', placeholder: 'ex: Egypt' },
  { name: 'status', text: 'Status*', placeholder: 'ex: Studying React.js' },
  {
    name: 'skills',
    text: 'Skills* (seperated by spaces)',
    placeholder: 'ex: HTML CSS JavaScript',
  },
  { name: 'company', text: 'Company (optional)' },
  { name: 'website', text: 'Website (optional)' },
  { name: 'githubUserName', text: 'GitHub Username (optional)' },
  { name: 'github', text: 'GitHub (optional)' },
  { name: 'linkedin', text: 'Linkedin (optional)' },
  { name: 'twitter', text: 'Twitter (optional)' },
  { name: 'youtube', text: 'Youtube (optional)' },
];

export default function UpdateProfile() {
  const [profileData, setProfileData] = useState(initialProfileForm);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.profile) return;
    const { _id, date, __v, education, experience, social, ...profileInfo } = {
      ...location.state?.profile,
    };
    const profile = { ...profileInfo, ...social };
    profile.skills = profile.skills.join(' ');
    setProfileData(profile);
  }, []);

  function handleProfileChange(e) {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    submitForm();
  }

  async function submitForm() {
    setIsLoading(true);

    const { github, linkedin, youtube, twitter, ...profile } = profileData;

    profile.social = { github, linkedin, youtube, twitter };
    profile.skills = profile.skills
      .trim()
      .split(' ')
      .filter((item) => item !== '');
    let formError = '';

    try {
      const newProfile = await createProfile(profile);
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
        Update Your Profile
      </h2>

      <div className="w-full px-3 sm:px-10">
        {profileForm.map((item, index) => (
          <InputControl
            key={index}
            name={item.name}
            text={item.text}
            placeholder={item.placeholder || ''}
            value={profileData[item.name]}
            disabled={isLoading}
            onChange={handleProfileChange}
          />
        ))}
      </div>

      <div className="mt-4 text-center">
        {isLoading && <Loader />}
        {error && <Alert variant="danger" text={error} />}
        <Button
          type="submit"
          text="Update your profile"
          variant="primary"
          disabled={isLoading}
        />
      </div>
    </form>
  );
}
