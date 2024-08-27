import { StyledH2 } from './style'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const Landing = () => {
  const navigate = useNavigate()
  return (
    <main>
      <StyledH2>Effortlessly track and optimize your finances with our intuitive budget manager.</StyledH2>
      <p>
        Take control of your finances with ease. Track spending, set goals, and get insightful reports—all in one place. Start optimizing your budget today.
      </p>
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
    </main>
  );
};

export default Landing;
