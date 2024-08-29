import { useState, useEffect, useContext } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { AuthedUserContext } from "../../App"
import * as budgetService from "../../services/budgetService"
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

import { StyledLink, StyledSection, StyledBudgetButtonDiv } from './style'



ChartJS.register(ArcElement, Tooltip, Legend)

const BudgetDetails = (props) => {
  const { budgetId } = useParams()
  const [budget, setBudget] = useState(null)
  const user = useContext(AuthedUserContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBudget = async () => {
      const budgetData = await budgetService.showBudget(budgetId)
      setBudget(budgetData)
      const budgets = await budgetService.indexBudgets()
      props.setBudgets(budgets)
    }
    fetchBudget()
  }, [budgetId])

  if (!budget) return <main>Loading...</main>


  const total = budget.expense.reduce((acc, { type, amount }) => {
    acc[type]
      ? acc[type] += amount
      : acc[type] = amount
    return acc
  }, {})

  const entries = Object.entries(total)
  const labelArr = entries.map(e => e[0])
  const dataValues = entries.map(e => e[1])

  const data = {
    labels: labelArr,
    datasets: [{
      label: `Expenses`,
      data: dataValues,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(128, 239, 128)',
        'rgb(218, 177, 218)',
        'rgb(198, 131, 70)',
        'rgb(222, 161, 147)',
      ],
      hoverOffset: 4
    }]
  }

  const runningTotal = dataValues.reduce((acc, element) => acc += element, 0)

  const options = {}

  return (
    <main>
      <header>
        <h1>{budget.name}</h1>
        <h2>Budget Total: ${budget.amount.toLocaleString('en-US')}</h2>
        <h3>Remaining Total: ${(budget.amount - runningTotal).toLocaleString('en-US')}</h3>
        <p>Created on {new Date(budget.createdAt).toLocaleDateString()} at {new Date(budget.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        <StyledBudgetButtonDiv>
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled button group"
          >
            <Button
              onClick={() => { navigate(`/budgets/${budgetId}/edit`) }}
              sx={{
                bgcolor: 'rgb(67,146,138)',
                color: 'rgb(232, 241, 220)',
                '&:hover': {
                }
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => { props.handleDeleteBudget(budgetId) }}
              sx={{
                bgcolor: 'rgb(67,146,138)',
                color: 'rgb(232, 241, 220)',
                '&:hover' : {
                }
              }}
            >
              Delete
            </Button>
          </ButtonGroup>
          <Link to={`/budgets/`}>Go Back</Link>
        </StyledBudgetButtonDiv>
      </header>
      <StyledSection>
        <div>
          <h2>Expenses</h2>
            {!budget.expense.length &&
            <p>There are no expenses</p>
            }
          <List sx={{ width: '100%', maxWidth: 360, fontFamily: 'Poppins' }}>
            {budget.expense.map((expense) => (
              <StyledLink key={expense._id} to={`/budgets/${budgetId}/expenses/${expense._id}`}>
                <ListItem disablePadding>
                  <ListItemButton >
                    <ListItemText
                      primary={`Expense: ${expense.name}`}
                      secondary={
                        <>
                          {`Amount: $${expense.amount.toLocaleString('en-US')}`}
                          <br />
                          {`Created: ${new Date(expense.createdAt).toLocaleDateString()} at ${new Date(expense.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                        </>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </StyledLink>
            ))}
          </List>

          <Link
            to={`/budgets/${budgetId}/expenses/new`}
          >
            <Fab color="primary" variant="extended">
              <AddIcon sx={{ mr: 1 }} />
              Add Expense
            </Fab>
          </Link>
        </div>

        <div style={{
          width: '50%',
          maxWidth: '440px'
        }}>
          <h2>Current Total: ${runningTotal.toLocaleString('en-US')}</h2>
          <Doughnut
            data={data}
            options={options}
          >
          </Doughnut>
        </div>

      </StyledSection>
    </main>
  );
}

export default BudgetDetails
  ;