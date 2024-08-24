import { useState, useEffect, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { AuthedUserContext } from "../../App"
import * as budgetService from "../../services/budgetService"


const BudgetDetails = (props) => {
  const { budgetId } = useParams()
  const [budget, setBudget] = useState(null)
  const user = useContext(AuthedUserContext)

  useEffect (() => {
    const fetchBudget = async () => {
      const budgetData = await budgetService.showBudget(budgetId)
      setBudget(budgetData)
    }
    fetchBudget()
  },[budgetId])

  if (!budget) return <main>Loading...</main>

  return (
    <main>
      <header>
        {console.log(budget)}
        <h1>{budget.name}</h1>
        <h2>Budget Total: ${budget.amount}</h2>
        <p>Created on {new Date(budget.createdAt).toLocaleDateString()} at {new Date(budget.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      </header>
      <section>
        <h2>Expenses</h2>
        <ul>
          {budget.expense.map(expense => {
            return (
              <Link key={expense._id} to={`/budgets/${budgetId}/expenses/${expense._id}`}>
                <li>{expense.name}</li>
              </Link>
            )
          })}
        </ul>
      </section>
    </main>
  );
}

export default BudgetDetails
  ;