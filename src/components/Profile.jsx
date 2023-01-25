import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getTokenData } from '../services/authService';
import { getUserProfile } from '../services/profileService';
import Button from './common/Button';
import ProfileSkeleton from './common/ProfileSkeleton';
import ProfileInfo from './ProfileInfo';

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  const location = useLocation();
  const update = location.state?.update;

  useEffect(() => {
    getProfile();
  }, [update]);

  const { userId } = useParams();
  const token = getTokenData();

  async function getProfile() {
    try {
      const profile = await getUserProfile(userId);
      setUserProfile(profile);
    } catch (error) {
      if (error.status === 400 || error.status === 404) {
        setUserProfile(null);
      }
    }
    setIsLoading(false);
  }

  const handleEducationDelete = (educationId) => {
    const newUserProfile = { ...userProfile };
    const educationIndex = newUserProfile.education.findIndex(
      (item) => item._id === educationId
    );
    newUserProfile.education.splice(educationIndex, 1);
    setUserProfile(newUserProfile);
  };

  const handleExperienceDelete = (experienceId) => {
    const newUserProfile = { ...userProfile };
    const experienceIndex = newUserProfile.experience.findIndex(
      (item) => item._id === experienceId
    );
    newUserProfile.experience.splice(experienceIndex, 1);
    setUserProfile(newUserProfile);
  };

  return (
    <div className="mb-10 p-2 text-center">
      {isLoading && <ProfileSkeleton />}

      {userProfile ? (
        <ProfileInfo
          profile={userProfile}
          onEducationDelete={handleEducationDelete}
          onExperienceDelete={handleExperienceDelete}
        />
      ) : token.user.id === userId ? (
        <>
          <h2 className="mt-6 mb-10 text-center text-4xl text-gray-700">
            You don't have a profile!
          </h2>
          <Button
            as="link"
            to="/updateprofile"
            text="Create your profile"
            variant="secondary"
          />
        </>
      ) : (
        <h2 className="mt-6 mb-10 text-center text-4xl text-gray-700">
          This user doesn't have a profile yet!
        </h2>
      )}
    </div>
  );
}
