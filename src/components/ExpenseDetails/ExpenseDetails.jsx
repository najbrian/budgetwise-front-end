import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import * as budgetService from '../../services/budgetService'

const ExpenseDetails = (props) => {
  const { budgetId, expenseId } = useParams()

  const [expense, setExpense] = useState([])

  useEffect(() => {
    const fetchExpense = async () => {
      const expenseData = await budgetService.showExpense(budgetId, expenseId)
      setExpense(expenseData)
    }
    fetchExpense()
  }, [expenseId])

  return (
    <main>
      <header>
        <h1>{expense.name}</h1>
        <p>Created on {new Date(expense.createdAt).toLocaleDateString()} at {new Date(expense.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        <p>Expense Type: {expense.type}</p>
        <p>Expense Amount: {expense.amount}</p>
      </header>
      {/* <section>
        <h2>Expense Notes:</h2>
        <ul>
          {expense.notes.map(note => {
            return (
              <li key={note._id}>{note.name} <p>Created on {new Date(note.createdAt).toLocaleDateString()} at {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <button>Edit</button>
                <button>Delete</button>
              </li>
            )
          })}
        </ul>
      </section> */}
    </main>
  );
}

export default ExpenseDetails;