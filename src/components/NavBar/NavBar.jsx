import { Link } from 'react-router-dom'
import { AuthedUserContext } from '../../App'
import { useContext, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { StyledImg, StyledNav } from './style'
import React from 'react'


import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';



const NavBar = ({ handleSignout }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null)
  const navigate = useNavigate()

  const handleTestFix = (e) => {
    handleSignout()
    handleClick(e)
  }


  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };


  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      if (anchorRef.current) anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleClick = (evt) => {
    const button = evt.target.textContent

    const navigationMap = {
      'Log In': '/signin',
      'Sign Up': '/signup',
      'Home': '/',
      'My Budgets': '/budgets',
      'Sign Out': '/'
    }
    if (navigationMap[button]) { navigate(navigationMap[button]) }
    setOpen(false)
  }


  const user = useContext(AuthedUserContext)



  return (
    <>
      {user ? (
        <>
          <StyledNav>
            <StyledImg src="https://i.imgur.com/tBxDpVk.png" alt='budgetwise-logo' onClick={() => navigate('/')} />
            <Stack direction="row" spacing={2}>
              <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                sx={{
                  color: 'rgb(67, 146, 138)',
                  '&:hover': {
                    bgcolor: 'rgb(67, 146, 138)',
                    color: 'rgb(232, 241, 220)',
                  }
                }}
                
                onClick={handleToggle}
              >
                {user.username}<ArrowDropDownIcon/>
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                popperOptions={{ positionFixed: true, preventOverflow: true }}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                      }
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          sx={{
                          }}
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem onClick={(evt) => handleClick(evt)}>Home</MenuItem>
                          <MenuItem onClick={(evt) => handleClick(evt)}>My Budgets</MenuItem>
                          <MenuItem onClick={handleTestFix}>Sign Out</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Stack>
          </StyledNav>

        </>
      ) : (
        <StyledNav>
          <StyledImg src="https://i.imgur.com/tBxDpVk.png" alt='budgetwise-logo' onClick={() => navigate('/')} />
          <div>
            <Button
              onClick={() => navigate('/signin')}
              variant="contained"
              sx={{
                mt: '50px',
                mr: '10px',
                bgcolor: 'rgb(67,146,138)',
                color: 'rgb(232, 241, 220)',
                '&:hover': {
                  bgcolor: 'rgb(232, 241, 230)',
                  color: 'rgb(67,146,138)'
                }
              }}>
              Log In
            </Button>
            <Button
              onClick={() => navigate('/signup')}
              variant="contained"
              sx={{
                mt: '50px',
                mr: '10px',
                bgcolor: 'rgb(232, 241, 230)',
                color: 'rgb(67,146,138)',
                '&:hover': {
                  bgcolor: 'rgb(67,146,138)',
                  color: 'rgb(232, 241, 220)',
                }
              }}>
              Sign Up
            </Button>
          </div>
        </StyledNav>
      )}


    </>
  );
};
export default NavBar;
