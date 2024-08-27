import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Dashboard = ({}) => {
  const user = useContext(AuthedUserContext);
  const navigate = useNavigate()
  return (
    <main>
      <h1>Welcome, {user.firstname}!</h1>
      <p>
        Start setting goals, track your spending, and look at where most of your finances are going. 
      </p>
      <Button onClick={() => navigate('/budgets')}>My Budgets</Button>
    </main>
  );
};

export default Dashboard;
