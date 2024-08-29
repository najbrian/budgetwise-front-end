import { Budgets, StyledLinks, StyledBudget } from './style'
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { Link } from "react-router-dom";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

ChartJS.register(ArcElement, RadialLinearScale, Tooltip, Legend)


const BudgetList = (props) => {
  let totalBudget = 0
  const eachBudget = props.budgets.forEach((budget) => {
    totalBudget = totalBudget + budget.amount
  })

  const total = props.budgets.reduce((acc, { name, amount }) => {
    acc[name]
      ? acc[name] += amount
      : acc[name] = amount
    return acc
  }, {})

  const entries = Object.entries(total)
  const labelArr = entries.map(e => e[0])
  const dataValues = entries.map(e => e[1])
  const data = {
    labels: labelArr,
    datasets: [{
      label: 'My First Dataset',
      data: dataValues,
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(255, 205, 86, 0.7)',
        'rgba(201, 203, 207, 0.7)',
        'rgba(54, 162, 235, 0.7)'
      ],
    }]
  };


  const options = {}

  return (
    <main>
      <h1>My Budgets</h1>

      <div className="total-budget-div">
        <h2>Total of Budgets: ${totalBudget.toLocaleString('en-US')}</h2>
        <StyledBudget>
          <div style={{
            width: '50%',
            maxWidth: '440px'
          }}>
            <PolarArea
              data={data}
              options={options}
            ></PolarArea>
          </div>
          <List sx={{ width: '100%', maxWidth: 360, fontFamily: 'Poppins' }}>
            {props.budgets.map((budget) => (
              <StyledLinks key={budget._id} to={`/budgets/${budget._id}`}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText
                      primary={`Budget Name: ${budget.name}`}
                      secondary={`Budget Amount: $${budget.amount.toLocaleString('en-US')}`} />
                  </ListItemButton>
                </ListItem>
              </StyledLinks>
            ))}
            <Link
              to={'/budgets/new'}
            >
              <Fab color="primary" variant="extended" sx={{mt: '20px'}}
              >
                <AddIcon sx={{ mr: 1 }} />
                Add New Budget
              </Fab>
            </Link>
          </List>

        </StyledBudget>
      </div>
    </main>
  );
}

export default BudgetList;