import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getTokenData } from '../services/authService';
import { getUserProfile } from '../services/profileService';
import Button from './common/Button';
import ProfileSkeleton from './common/ProfileSkeleton';
import ProfileInfo from './ProfileInfo';

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
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
      const { profile, user } = await getUserProfile(userId);
      setUserInfo(user);
      setUserProfile(profile);
    } catch (error) {
      if (error.status === 400 || error.status === 404) {
        setUserInfo(null);
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

  if (isLoading) return <ProfileSkeleton />;

  return (
    <div className="mb-10 p-2 text-center">
      {!userProfile && userInfo && (
        <div className="my-6 flex flex-col items-center justify-center border-b-2 border-b-gray-200 pb-3 text-center font-bold text-gray-700">
          <img
            className="h-40 w-40 rounded-full"
            src={userInfo.avatar}
            alt=""
          />
          <p className="mt-2 text-4xl">{userInfo.name}</p>
        </div>
      )}

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
