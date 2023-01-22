import React, { useState } from 'react';
import deleteIcon from '../assets/icons/delete.svg';
import { getTokenData } from '../services/authService';
import { removeEducation } from '../services/profileService';
import DeleteModal from './DeleteModal';

export default function Education({
  education,
  profileUserId,
  onEducationDelete,
}) {
  const [showDelete, setShowDelete] = useState(false);

  const {
    _id: educationId,
    from,
    to,
    school,
    specialization,
    degree,
    current,
    description,
    grade,
  } = education;
  const token = getTokenData();
  const fromDate = new Date(from).toLocaleDateString();
  const toDate = new Date(to).toLocaleDateString();

  const handleEducationDelete = async () => {
    try {
      await removeEducation(educationId);
      setShowDelete(false);
      onEducationDelete(educationId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-8 flex items-start justify-between px-2 text-left text-lg font-bold text-gray-700">
      <div>
        <p className="mb-1 text-gray-800">
          {school} - {specialization},{' '}
          {degree && <span className="italic text-gray-600">{degree}</span>}
        </p>
        <p className="mb-1 text-sm text-gray-500">
          {fromDate} - {current ? 'PRESENT' : toDate}
        </p>
        {description && <p className="mb-1 text-sm">{description}</p>}
        {grade && <p className="mb-1 text-sm">Grade: {grade}</p>}
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
          onPostDelete={handleEducationDelete}
          onCloseDelete={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}
