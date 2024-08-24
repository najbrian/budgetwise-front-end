import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as budgetService from '../../services/budgetService'

const ExpenseForm = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    type: 'Misc'
  })

  const { budgetId } = useParams()

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.handleAddExpense(budgetId, formData)
    // if (budgetId) {
    //   props.handleUpdateBudget(budgetId, formData)
    // } else {
    //   props.handleAddBudget(formData)
    // }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>New Expense</h1>
        <label htmlFor="expenseform-name-input">Expense Name:</label>
        <input
          required
          type="text"
          name="name"
          id="expenseform-name-input"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="expenseform-amount-input">Amount</label>
        <input
          required
          type="number"
          name="amount"
          id="expenseform-amount-input"
          min="0"
          value={formData.amount}
          onChange={handleChange}
        />
         <label htmlFor="expenseform-type-input">Expense Type</label>
        <select
          required
          name="type"
          id="expenseform-type-input"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="Rent/Mortgage">Rent/Mortgage</option>
          <option value="Subscription">Subscription</option>
          <option value="Groceries">Groceries</option>
          <option value="Dining Out">Dining Out</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Credit Card">Credit Card Payment</option>
          <option value="Misc">Misc.</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default ExpenseForm;