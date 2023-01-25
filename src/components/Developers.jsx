import React, { useEffect, useState } from 'react';
import { getAllProfiles } from '../services/profileService';
import Button from './common/Button';
import locationIcon from '../assets/icons/location.svg';
import ProfileSkeleton from './common/ProfileSkeleton';
import Alert from './common/Alert';
import Loader from './common/Loader';

export default function Developers() {
  const [profiles, setProfiles] = useState(Array(10).fill(null));
  const [isEmpty, setIsEmpty] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProfiles();
  }, [pageNum]);

  const fetchProfiles = async () => {
    const pageSize = 5;
    const newProfiles = await getAllProfiles(pageSize, pageNum);
    setIsLoading(false);

    if (newProfiles.length === 0) {
      setIsEmpty(true);
      if (profiles[0] === null) setProfiles([]);
      return;
    }
    const allProfiles =
      profiles[0] === null ? [...newProfiles] : [...profiles, ...newProfiles];
    setProfiles(allProfiles);
    setIsEmpty(false);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    if (profiles.length === 0) {
      setPageNum(1);
    } else {
      setPageNum(pageNum + 1);
    }
  };

  return (
    <>
      <div className="mt-5 flex min-w-fit flex-col items-center justify-center p-5">
        <h2 className="mb-5 text-center text-4xl text-gray-700">Developers</h2>

        {profiles.map((profile, index) =>
          profile ? (
            <DeveloperProfile key={profile._id} profile={profile} />
          ) : (
            <ProfileSkeleton key={index} />
          )
        )}
      </div>

      <div className="mb-10 flex flex-col items-center justify-between p-5">
        {isEmpty && profiles[0] && (
          <Alert text="There are no more developers." variant="primary" />
        )}
        {isLoading && (
          <div className="mt-4">
            <Loader />
          </div>
        )}
        {!isEmpty && (
          <Button
            type="button"
            text="Load More"
            variant="secondary"
            disabled={isLoading}
            onClick={handleLoadMore}
          />
        )}
      </div>
    </>
  );
}

const DeveloperProfile = ({ profile }) => (
  <div className="m-5 w-full rounded-lg border border-gray-400 bg-white py-8 px-4 text-center transition-shadow duration-300 ease-in-out hover:shadow-xl sm:w-4/5 md:w-3/4 md:px-8 lg:w-3/5 xl:w-1/2">
    <div className="mb-8 flex flex-col items-center justify-center border-b-2 border-b-gray-200 pb-3 text-center font-bold text-gray-700">
      <img
        className="h-28 w-28 rounded-full"
        src={profile.user.avatar}
        alt=""
      />
      <p className="mt-2 text-2xl">{profile.user.name}</p>
      <p className="mt-3 text-lg">{profile.bio}</p>
      <div className="mt-3 flex items-center justify-center">
        <img src={locationIcon} className="mr-1 inline-block h-5 w-5" alt="" />
        <span className="text-lg font-medium text-gray-600">
          {profile.location}
        </span>
      </div>
    </div>

    <Button
      as="link"
      to={`/profile/${profile.user._id}`}
      type="button"
      variant="primary"
      text="Show Full Profile"
    />
  </div>
);
