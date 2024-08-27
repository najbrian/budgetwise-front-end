import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import {} from './style'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


const SigninForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData);
      console.log(user);
      props.setUser(user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <main>
      <h1>Log In</h1>
      <p>{message}</p>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: '80px',
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Username"
          id="username"
          name="username"
          variant="filled"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          id="password"
          name="password"
          variant="filled"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            bgcolor: 'rgb(232, 241, 220)',
            color: 'rgb(67,146,138)',
            '&:hover': {
              bgcolor: 'rgb(67,146,138)',
              color: 'rgb(232, 241, 220)',
            }
          }}>
          Log In
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
    </ main>
  );
};

export default SigninForm;
