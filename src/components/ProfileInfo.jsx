import React from 'react';
import locationIcon from '../assets/icons/location.svg';
import companyIcon from '../assets/icons/company.svg';
import githubIcon from '../assets/icons/github.svg';
import statusIcon from '../assets/icons/status.svg';
import linkedinIcon from '../assets/icons/linkedin.svg';
import twitterIcon from '../assets/icons/twitter.svg';
import youtubeIcon from '../assets/icons/youtube.svg';
import linkIcon from '../assets/icons/link.svg';
import Button from './common/Button';
import { getTokenData } from '../services/authService';

export default function ProfileInfo({ profile }) {
  console.log(profile);
  const profileData = [
    {
      name: profile.status,
      icon: statusIcon,
    },
    {
      name: profile.location,
      icon: locationIcon,
    },
    {
      name: profile.company,
      icon: companyIcon,
    },
    {
      name: profile.website && (
        <a
          href={profile.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700"
        >
          {profile.website}
        </a>
      ),
      icon: linkIcon,
    },
  ];

  const socialData = [
    {
      href: profile.social?.github,
      icon: githubIcon,
    },
    {
      href: profile.social?.linkedin,
      icon: linkedinIcon,
    },
    {
      href: profile.social?.twitter,
      icon: twitterIcon,
    },
    {
      href: profile.social?.youtube,
      icon: youtubeIcon,
    },
  ];

  const token = getTokenData();
  // const profileDate = new Date(profile.date).toLocaleDateString();
  // console.log(profileDate);

  return (
    <div className="my-5 mx-auto w-full rounded-lg bg-white py-6 px-4 text-center sm:w-4/5 sm:text-right md:w-3/4 md:px-8 lg:w-3/5 xl:w-1/2">
      {token.user.id === profile.user._id && (
        <Button
          as="link"
          to="/updateprofile"
          text="Edit your profile"
          variant="secondary"
          state={{ profile }}
        />
      )}

      <div className="my-6 flex flex-col items-center justify-center border-b-2 border-b-gray-200 pb-3 text-center font-bold text-gray-700">
        <img
          className="h-40 w-40 rounded-full"
          src={profile.user.avatar}
          alt=""
        />
        <p className="mt-2 text-4xl">{profile.user.name}</p>
        <p className="mt-3 text-lg">{profile.bio}</p>
      </div>

      <div className="mt-5 w-full">
        {profileData.map((item, index) => (
          <Info key={index} name={item.name} icon={item.icon} />
        ))}
      </div>

      <div className="mt-5 flex w-full flex-wrap items-center justify-center">
        {profile.skills.map((skill, index) => (
          <Skill key={index} skill={skill} />
        ))}
      </div>

      {(profile.education.length > 0 || token.user.id === profile.user._id) && (
        <div className="m-5 mb-10 border-t-2 border-t-gray-200 pt-5 text-center">
          <h3 className="mb-2 text-left text-2xl font-bold text-gray-700">
            Education
          </h3>
          {profile.education.map((item) => (
            <Education key={item._id} education={item} />
          ))}
          {token.user.id === profile.user._id && (
            <Button
              as="link"
              to="/neweducation"
              text="Add Education"
              variant="secondary"
            />
          )}
        </div>
      )}
      {(profile.experience.length > 0 ||
        token.user.id === profile.user._id) && (
        <div className="m-5 mb-10 border-t-2 border-t-gray-200 pt-5 text-center">
          <h3 className="mb-2 text-left text-2xl font-bold text-gray-700">
            Experience
          </h3>
          {profile.experience.map((item) => (
            <Experience key={item._id} experience={item} />
          ))}
          {token.user.id === profile.user._id && (
            <Button
              as="link"
              to="/newexperience"
              text="Add Experience"
              variant="secondary"
            />
          )}
        </div>
      )}

      <div className="mt-10 flex items-center justify-center border-t-2 border-t-gray-200 pt-5">
        {socialData.map((item, index) => (
          <SocialLink key={index} href={item.href} icon={item.icon} />
        ))}
      </div>
    </div>
  );
}

const Info = ({ name, icon }) =>
  name ? (
    <div className="mt-3 flex items-center justify-center">
      <img src={icon} className="mr-2 inline-block h-5 w-5" alt="" />
      <span className="text-lg font-medium text-gray-600">{name}</span>
    </div>
  ) : null;

const Skill = ({ skill }) => (
  <span className="m-2 rounded-full bg-cyan-800 px-3 py-1 text-xs uppercase text-gray-100">
    {skill}
  </span>
);

const SocialLink = ({ href, icon }) =>
  href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mx-2 text-blue-700"
    >
      <img className="h-7 w-7 cursor-pointer" src={icon} alt="" />
    </a>
  ) : null;

const Education = ({ education }) => {
  const fromDate = new Date(education.from).toLocaleDateString();
  const toDate = new Date(education.to).toLocaleDateString();
  return (
    <div className="mb-8 px-2 text-left text-lg font-bold text-gray-700">
      <p className="mb-1 text-gray-800">
        {education.school} - {education.specialization},{' '}
        <span className="italic text-gray-600">{education.degree}</span>
      </p>
      <p className="mb-1 text-sm text-gray-500">
        {fromDate} - {education.current ? 'PRESENT' : toDate}
      </p>
      <p className="mb-1 text-sm">{education.description}</p>
      <p className="mb-1 text-sm">Grade: {education.grade}</p>
    </div>
  );
};

const Experience = ({ experience }) => {
  const fromDate = new Date(experience.from).toLocaleDateString();
  const toDate = new Date(experience.to).toLocaleDateString();
  return (
    <div className="mb-8 px-2 text-left text-lg font-bold text-gray-700">
      <p className="mb-1 text-gray-800">
        {experience.company} -{' '}
        <span className="text-gray-500">{experience.title}</span>
      </p>
      <p className="mb-1 text-sm text-gray-500">
        {fromDate} - {experience.current ? 'PRESENT' : toDate}
      </p>
      <p className="mb-1 text-sm">{experience.description}</p>
    </div>
  );
};
