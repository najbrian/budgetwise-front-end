import { Link } from 'react-router-dom'
import { AuthedUserContext } from '../../App'
import { useContext } from 'react'
import { StyledImg, StyledNav, StyledUl } from './style.js'
const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext)



  return (
    <>
      {user ? (
        <>
          <StyledNav>
            <StyledImg src="https://i.imgur.com/KKIzDIh.png" alt='budgetwise-logo' />
            <StyledUl>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/budgets">My Budgets</Link></li>
              <li><Link to="" onClick={handleSignout}>Sign Out</Link></li>
            </StyledUl>
          </StyledNav>
        </>
      ) : (
        <StyledNav>
          <StyledImg src="https://i.imgur.com/KKIzDIh.png" alt='budgetwise-logo' />
          <StyledUl>
            <li><Link to="/signin">Log In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </StyledUl>
        </StyledNav>
      )}
    </>
  );
};
export default NavBar;
