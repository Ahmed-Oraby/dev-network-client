import { Link, NavLink } from 'react-router-dom';
import { getTokenData } from '../services/authService';
import menuIcon from '../assets/icons/menu.svg';
import { useState } from 'react';

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(false);
  const tokenData = getTokenData();

  return (
    <nav className="relative z-50 flex h-20 w-full items-center justify-between bg-gray-800 px-5 text-lg">
      <div className="flex items-center justify-center">
        <Link
          className="rounded-md border-2 border-gray-200 bg-gray-900 px-4 py-2 text-lg font-bold text-white hover:border-blue-500 hover:text-blue-500"
          to={tokenData ? '/dashboard' : '/'}
        >
          DevNet
        </Link>
      </div>

      <img
        className="h-10 w-10 cursor-pointer md:hidden"
        src={menuIcon}
        alt=""
        onClick={() => setIsVisible((v) => !v)}
      />

      <div
        onClick={(e) => e.target.tagName === 'A' && setIsVisible((v) => !v)}
        className={`${
          isVisible ? 'flex' : 'hidden'
        } absolute top-16 left-0 right-0 flex-col items-center justify-center rounded-lg bg-gray-800 p-5 md:static md:flex md:flex-row md:p-0`}
      >
        {tokenData ? (
          <>
            <div className="mx-2 mb-3 flex w-full items-center justify-center border-b-2 border-b-gray-500 py-3 md:mb-0 md:w-auto md:border-none">
              <span className="mr-2 text-center font-bold text-gray-200">{`Hi, ${tokenData.user.name}`}</span>
              <img
                className="mr-0 h-8 w-8 rounded-full outline outline-white sm:mr-5"
                src={tokenData.user.avatar}
                alt=""
              />
            </div>
            <NavItem to="/dashboard">Dashboard</NavItem>
            <NavItem to="/developers">Developers</NavItem>
            <NavItem
              to={`/profile/${tokenData.user.id}`}
              state={{ update: true }}
            >
              My&nbsp;Profile
            </NavItem>
            <NavItem to="/logout">Logout</NavItem>
          </>
        ) : (
          <>
            <NavItem to="/login">Login</NavItem>
            <NavItem to="/register">Register</NavItem>
          </>
        )}
      </div>
    </nav>
  );
}

function NavItem({ children, to, state = null }) {
  return (
    <NavLink
      state={state}
      to={to}
      className={({ isActive }) =>
        `${
          isActive ? 'bg-gray-900' : ''
        } mx-1 my-2 rounded-md px-3 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white md:my-0`
      }
    >
      {children}
    </NavLink>
  );
}
