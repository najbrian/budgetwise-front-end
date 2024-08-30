import { useState, useEffect, useContext } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { AuthedUserContext } from "../../App"
import * as budgetService from "../../services/budgetService"
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';



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
      // const budgets = await budgetService.indexBudgets()
      // props.setBudgets(budgets)
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
        'rgb(128, 239, 128)',
        'rgb(218, 177, 218)',
        'rgb(198, 131, 70)',
        'rgb(222, 161, 147)',
        'rgb(255, 205, 86)',
        'rgb(54, 162, 235)',
      ],
      hoverOffset: 4
    }]
  }

  const runningTotal = dataValues.reduce((acc, element) => acc += element, 0)

  const options = {}

  const rows = budget.expense.map((expense, index) => ({
    id: expense._id,
    type: expense.type,
    name: expense.name,
    amount: `$${expense.amount.toLocaleString('en-US')}`,
    dateCreated: new Date(expense.createdAt).toLocaleDateString(),
    owner: expense.owner.username
  }));

  const columns = [
    { field: 'type', headerName: 'Type', width: 150 },
    {
      field: 'name', headerName: 'Name', width: 150, renderCell: ({ row }) => (
        <Link
          to={`/budgets/${budgetId}/expenses/${row.id}`}
          style={{ textDecoration: 'none' }}
        >
          {row.name}

        </Link>
      ),
    },
    { field: 'amount', headerName: 'Amount', width: 150, type: 'number' },
    { field: 'dateCreated', headerName: 'Date Created', width: 150 },
    { field: 'owner', headerName: 'Created By', width: 150}
  ];

  return (
    <main>
      <header>
        <h1>{budget.name}</h1>
        <h2>Budget Total: ${budget.amount.toLocaleString('en-US')}</h2>
        <h3>Remaining Total: ${(budget.amount - runningTotal).toLocaleString('en-US')}</h3>
        <p>Created on {new Date(budget.createdAt).toLocaleDateString()} at {new Date(budget.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} by <strong>{budget.owner.username}</strong></p>
        {budget.owner._id === user._id &&
        <StyledBudgetButtonDiv>
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled button group"
          >
            <Button
              onClick={() => { navigate(`/budgets/${budgetId}/edit`) }}
              sx={{
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
                color: 'rgb(232, 241, 220)',
                '&:hover': {
                }
              }}
            >
              Delete
            </Button>
          </ButtonGroup>
          <Link to={`/budgets`}>Go Back</Link>
        </StyledBudgetButtonDiv>
         }
      </header>
      <StyledSection>
        <div>
          <h2>Expenses</h2>
          {!budget.expense.length
            ?
            <p>There are no expenses</p>
            :
            <div>
              <DataGrid
                rows={rows}
                columns={columns}
                rowsPerPageOptions={[5, 10, 20]}
                slots={{ toolbar: GridToolbar }}
                sx={{
                  '& .MuiDataGrid-cell': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '& .MuiDataGrid-columnHeader': {
                    backgroundColor: 'rgba(25, 118, 210, 0.6)',
                  },
                }}
              />
            </div>

          }


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