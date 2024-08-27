import { StyledBudgetListDiv, Budgets } from './style'

import { Link } from "react-router-dom";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';


const BudgetList = (props) => {
  let totalBudget = 0
  const eachBudget = props.budgets.forEach((budget) => {
    totalBudget = totalBudget + budget.amount
  })

  return (
    <main>
      <h1>My Budgets</h1>
      <StyledBudgetListDiv>
        <Budgets>
          <List sx={{ width: '100%', maxWidth: 360, fontFamily: 'Poppins' }}>
            {props.budgets.map((budget) => (
              <Link key={budget._id} to={`/budgets/${budget._id}`}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText
                    primary={`Budget Name: ${budget.name}`}
                    secondary={`Budget Amount: $${budget.amount}`} />
                  </ListItemButton>
                </ListItem>
              </Link>

            ))}
          </List>
        </Budgets>
        <div className="total-budget-div">
          <h2>Total Budget: {totalBudget}</h2>
        </div>
      </StyledBudgetListDiv>
      <Link to={'/budgets/new'}><p>Add New Budget</p></Link>
    </main>
  );
}

export default BudgetList;