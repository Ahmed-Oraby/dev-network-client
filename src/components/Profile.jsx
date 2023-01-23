import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getTokenData } from '../services/authService';
import { getOwnProfile, getUserProfile } from '../services/profileService';
import Button from './common/Button';
import ProfileSkeleton from './common/ProfileSkeleton';
import ProfileInfo from './ProfileInfo';

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [createProfile, setCreateProfile] = useState(false);
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
      setIsLoading(false);
      setUserProfile(profile);
    } catch (error) {
      if (error.status === 400 || error.status === 404) {
        setIsLoading(false);
        setCreateProfile(true);
      }
    }
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
      {token.user.id === userId && createProfile && (
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
      )}

      {token.user.id !== userId && !userProfile && (
        <h2 className="mt-6 mb-10 text-center text-4xl text-gray-700">
          This user doesn't have a profile yet!
        </h2>
      )}

      {userProfile && (
        <ProfileInfo
          profile={userProfile}
          onEducationDelete={handleEducationDelete}
          onExperienceDelete={handleExperienceDelete}
        />
      )}
    </div>
  );
}
