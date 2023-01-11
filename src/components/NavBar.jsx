import { Link, NavLink } from 'react-router-dom';
import { getTokenData } from '../services/authService';

export default function NavBar() {
  const tokenData = getTokenData();

  return (
    <nav className="flex h-20 w-full items-center justify-between bg-gray-800 px-10 text-lg">
      <div className="flex items-center justify-center">
        <Link
          className="rounded-md border-2 border-gray-200 bg-gray-900 px-4 py-2 font-bold text-white"
          to={tokenData ? '/dashboard' : '/'}
        >
          DevNet
        </Link>
        {tokenData && (
          <div className="flex items-center justify-center">
            <span className="ml-6 mr-3 font-bold text-gray-200">{`Hi, ${tokenData.user.name}`}</span>
            <img
              className="h-8 w-8 rounded-full outline outline-white"
              src={tokenData.user.avatar}
              alt=""
            />
          </div>
        )}
      </div>

      {tokenData ? (
        <div>
          <NavItem to="/dashboard">Dashboard</NavItem>
          <NavItem to="/profile">My Profile</NavItem>
          <NavItem to="/logout">Logout</NavItem>
        </div>
      ) : (
        <div>
          <NavItem to="/login">Login</NavItem>
          <NavItem to="/register">Register</NavItem>
        </div>
      )}
    </nav>
  );
}

function NavItem({ children, to }) {
  return (
    <Link
      to={to}
      className="mx-2 rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
    >
      {children}
    </Link>
  );
}
