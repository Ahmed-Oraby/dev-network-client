import React, { useState } from 'react';
import deleteIcon from '../assets/icons/delete.svg';
import { getTokenData } from '../services/authService';
import { removeExperience } from '../services/profileService';
import DeleteModal from './DeleteModal';

export default function Experience({
  experience,
  profileUserId,
  onExperienceDelete,
}) {
  const [showDelete, setShowDelete] = useState(false);

  const {
    _id: experienceId,
    from,
    to,
    company,
    title,
    current,
    description,
  } = experience;
  const token = getTokenData();
  const fromDate = new Date(from).toLocaleDateString();
  const toDate = new Date(to).toLocaleDateString();

  const handleExperienceDelete = async () => {
    try {
      await removeExperience(experienceId);
      setShowDelete(false);
      onExperienceDelete(experienceId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-6 flex items-start justify-between px-2 text-left text-lg font-bold text-gray-700">
      <div>
        <p className="mb-1 text-gray-800">
          {company} - <span className="text-gray-500">{title}</span>
        </p>
        <p className="mb-1 text-sm text-gray-500">
          {fromDate} - {current ? 'PRESENT' : toDate}
        </p>
        {description && <p className="mb-1 text-sm">{description}</p>}
      </div>

      {token.user.id === profileUserId && (
        <div>
          <img
            onClick={() => setShowDelete(true)}
            className="h-6 w-6 cursor-pointer"
            src={deleteIcon}
            alt=""
          />
        </div>
      )}

      {showDelete && (
        <DeleteModal
          onPostDelete={handleExperienceDelete}
          onCloseDelete={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}
