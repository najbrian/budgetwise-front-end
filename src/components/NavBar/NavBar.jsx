import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
      {user ? (
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/budgets">My Budgets</Link></li>
            <li><Link to="" onClick={handleSignout}>Sign Out</Link></li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li><Link to="/signin">Log In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </nav>
      )}
    </>
  );
};
export default NavBar;
