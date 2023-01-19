import React from 'react';
import locationIcon from '../assets/icons/location.svg';
import companyIcon from '../assets/icons/company.svg';
import githubIcon from '../assets/icons/github.svg';
import statusIcon from '../assets/icons/status.svg';
import linkedinIcon from '../assets/icons/linkedin.svg';
import twitterIcon from '../assets/icons/twitter.svg';
import youtubeIcon from '../assets/icons/youtube.svg';
import Button from './common/Button';
import { getTokenData } from '../services/authService';

export default function ProfileInfo({ profile }) {
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
        />
      )}

      <div className="my-6 flex flex-col items-center justify-center text-center font-bold text-gray-700">
        <img
          className="h-40 w-40 rounded-full"
          src={profile.user.avatar}
          alt=""
        />
        <p className="mt-2 text-4xl">{profile.user.name}</p>
        <p className="mt-3 text-lg">{profile.bio}</p>
      </div>

      <div className="flex flex-col border-t-2 border-t-gray-300 sm:flex-row">
        <div className="m-2 w-full p-2 sm:w-1/2">
          {profileData.map((item, index) => (
            <Info key={index} name={item.name} icon={item.icon} />
          ))}
        </div>

        <div className="m-2 flex h-fit w-full flex-wrap items-center p-2 sm:w-1/2">
          {profile.skills.map((skill, index) => (
            <Skill key={index} skill={skill} />
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center border-t-2 border-t-gray-300 pt-2">
        {socialData.map((item, index) => (
          <SocialLink key={index} href={item.href} icon={item.icon} />
        ))}
      </div>
    </div>
  );
}

const Info = ({ name, icon }) =>
  name ? (
    <div className="mt-3 flex items-center">
      <img src={icon} className="mr-2 inline-block h-5 w-5" alt="" />
      <span className="text-lg font-medium text-gray-600">{name}</span>
    </div>
  ) : null;

const Skill = ({ skill }) => (
  <span className="m-2 rounded-full bg-cyan-800 px-3 py-1 text-sm uppercase text-gray-100">
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
      <img className="h-8 w-8 cursor-pointer" src={icon} alt="" />
    </a>
  ) : null;
