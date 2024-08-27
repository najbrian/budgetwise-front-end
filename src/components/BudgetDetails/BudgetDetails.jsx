import { useState, useEffect, useContext } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { AuthedUserContext } from "../../App"
import * as budgetService from "../../services/budgetService"
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { StyledSection } from './style'



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

  console.log(data)
  const options = {}

  return (
    <main>
      <header>
        <h1>{budget.name}</h1>
        <h2>Budget Total: ${budget.amount}</h2>
        <p>Created on {new Date(budget.createdAt).toLocaleDateString()} at {new Date(budget.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        <button onClick={() => { navigate(`/budgets/${budgetId}/edit`) }}>Edit</button>
        <button onClick={() => { props.handleDeleteBudget(budgetId) }}>Delete</button>
      </header>
      <StyledSection>
      <div>
          <h2>Expenses</h2>
          <ul>
            {budget.expense.map(expense => {
              return (
                <Link key={expense._id} to={`/budgets/${budgetId}/expenses/${expense._id}`}>
                  <li>{expense.name} created on {new Date(expense.createdAt).toLocaleDateString()} at {new Date(expense.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
                </Link>
              )
            })}
          </ul>
          <button onClick={() => { navigate(`/budgets/${budgetId}/expenses/new`) }}>Add Expense</button>
        </div>

        <div style={{ width: '20%' }}>
          <h2>Current Total: ${runningTotal}</h2>
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