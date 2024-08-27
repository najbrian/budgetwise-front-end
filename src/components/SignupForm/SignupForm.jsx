import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {StyledMain} from './style'
import * as authService from '../../services/authService'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    passwordConf: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { firstname, lastname, email, username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(firstname && lastname && email && username && password && password === passwordConf);
  };

  return (
    <StyledMain>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: '30px',
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >

        <TextField
          label="First Name"
          id="firstname"
          name="firstname"
          variant="filled"
          value={firstname}
          onChange={handleChange}
        />
        <TextField
          label="Last Name"
          id="lastname"
          name="lastname"
          variant="filled"
          value={lastname}
          onChange={handleChange}
        />
        <TextField
          label="Desired username"
          id="name"
          name="username"
          variant="filled"
          value={username}
          onChange={handleChange}
        />

        <TextField
          label="Email"
          id="email"
          name="email"
          variant="filled"
          value={email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          type="password"
          id="password"
          name="password"
          variant="filled"
          value={password}
          onChange={handleChange}
        />
        <TextField
          label="Confirm Password"
          type="password"
          id="confirm"
          name="passwordConf"
          variant="filled"
          value={passwordConf}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={isFormInvalid()}
          sx={{
            bgcolor: 'rgb(232, 241, 220)',
            color: 'rgb(67,146,138)',
            '&:hover': {
              bgcolor: 'rgb(67,146,138)',
              color: 'rgb(232, 241, 220)',
            }
          }}>
          Sign Up
        </Button>
        <Link to="/">
          <Button
            variant="contained"
            sx={{
              bgcolor: 'rgb(232, 241, 220)',
              color: 'rgb(67,146,138)',
              width: '80%',
              '&:hover': {
                bgcolor: 'rgb(67,146,138)',
                color: 'rgb(232, 241, 220)',
              }
            }}>
            Cancel
          </Button>
        </Link>
      </Box>
    </StyledMain>
  );
};

export default SignupForm;
