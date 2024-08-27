import { Link } from 'react-router-dom'
import { AuthedUserContext } from '../../App'
import { useContext, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { StyledImg, StyledNav, StyledUl } from './style'
import React from 'react'


import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

const NavBar = ({ handleSignout }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null)
  const navigate = useNavigate()
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
      'My Budgets': '/budgets'
    }
    if (navigationMap[button]) {navigate(navigationMap[button])}
    setOpen(false)
  }


  const user = useContext(AuthedUserContext)



  return (
    <>
      {user ? (
        <>
          <StyledNav>
          <StyledImg src="https://i.imgur.com/KKIzDIh.png" alt='budgetwise-logo' onClick={() => navigate('/')}/>
            <Stack direction="row" spacing={2}>
              <div>
                <Button
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={open ? 'composition-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  Menu
                </Button>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom-start' ? 'left top' : 'left bottom',
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem onClick={(evt) => handleClick(evt)}>Home</MenuItem>
                            <MenuItem onClick={(evt) => handleClick(evt)}>My Budgets</MenuItem>
                            <MenuItem onClick={handleSignout}>Sign Out</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </Stack>
          </StyledNav>
        </>
      ) : (
        <StyledNav>
          <StyledImg src="https://i.imgur.com/KKIzDIh.png" alt='budgetwise-logo' onClick={() => navigate('/')}/>
          <Stack direction="row" spacing={2}>
            <div>
              <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                Menu
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem onClick={(evt) => handleClick(evt)}>Log In</MenuItem>
                          <MenuItem onClick={(evt) => handleClick(evt)}>Sign Up</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </Stack>
        </StyledNav>
      )}


    </>
  );
};
export default NavBar;
