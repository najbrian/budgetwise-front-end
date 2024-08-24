import { useState, useEffect, useContext } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { AuthedUserContext } from "../../App"
import * as budgetService from "../../services/budgetService"


const BudgetDetails = (props) => {
  const { budgetId } = useParams()
  const [budget, setBudget] = useState(null)
  const user = useContext(AuthedUserContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBudget = async () => {
      const budgetData = await budgetService.showBudget(budgetId)
      setBudget(budgetData)
    }
    fetchBudget()
  }, [budgetId])

  if (!budget) return <main>Loading...</main>

  return (
    <main>
      <header>
        {console.log(budget)}
        <h1>{budget.name}</h1>
        <h2>Budget Total: ${budget.amount}</h2>
        <p>Created on {new Date(budget.createdAt).toLocaleDateString()} at {new Date(budget.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        <button onClick={() => {navigate(`/budgets/${budgetId}/edit`)}}>Edit</button>
        <button onClick={() => { props.handleDeleteBudget(budgetId) }}>Delete</button>
      </header>
      <section>
        <h2>Expenses</h2>
        <ul>
          {budget.expense.map(expense => {
            return (
              <Link key={expense._id} to={`/budgets/${budgetId}/expenses/${expense._id}`}>
                <li>{expense.name} <p>Created on {new Date(expense.createdAt).toLocaleDateString()} at {new Date(expense.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p></li>
              </Link>
            )
          })}
        </ul>
        <button onClick={() => {navigate(`/budgets/${budgetId}/expenses/new`)}}>Add Expense</button>
      </section>
    </main>
  );
}

export default BudgetDetails
  ;