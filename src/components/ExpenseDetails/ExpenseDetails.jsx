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
      <h1></h1>
    </main>
  );
}
 
export default ExpenseDetails;