import { Budgets, StyledLinks, StyledBudget } from './style'

import { Link } from "react-router-dom";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';


const BudgetList = (props) => {
  let totalBudget = 0
  const eachBudget = props.budgets.forEach((budget) => {
    totalBudget = totalBudget + budget.amount
  })

  const total = props.budgets.reduce((acc, {name, amount}) => {
    acc[name]
      ? acc[name] += amount
      : acc[name] = amount
    return acc
  }, {})

  
  const options={}

  return (
    <main>
      <h1>My Budgets</h1>
        <StyledBudget>
          <List sx={{ width: '100%', maxWidth: 360, fontFamily: 'Poppins' }}>
            {props.budgets.map((budget) => (
              <StyledLinks key={budget._id} to={`/budgets/${budget._id}`}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText
                      primary={`Budget Name: ${budget.name}`}
                      secondary={`Budget Amount: $${budget.amount}`} />
                  </ListItemButton>
                </ListItem>
              </StyledLinks>

            ))}
          </List>
        </StyledBudget>
       
        <div className="total-budget-div">
          <h2>Total Budget: ${totalBudget}</h2>
        </div>

      <Link
        to={'/budgets/new'}
      >
        <Fab color="primary" variant="extended">
        <AddIcon sx={{ mr: 1 }} />
        Add New Budget
      </Fab>
      </Link>
    </main>
  );
}

export default BudgetList;