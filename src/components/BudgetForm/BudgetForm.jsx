import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as budgetService from '../../services/budgetService'

const BudgetForm = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
  })

  const { budgetId } = useParams()

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (budgetId) {
      props.handleUpdateBudget(budgetId, formData)
    } else {
      props.handleAddBudget(formData)
    }
  }

  useEffect(() => {
    const fetchBudget = async () => {
      const budgetData = await budgetService.showBudget(budgetId)
      setFormData(budgetData)
    }
    if(budgetId) fetchBudget()
  },[budgetId])


  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>{budgetId ? `Edit Budget` : 'Create New Budget'}</h1>
        <label htmlFor="budgetform-name-input">Budget Name:</label>
        <input
          required
          type="text"
          name="name"
          id="budgetform-name-input"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="budgetform-amount-input">Amount</label>
        <input
          required
          type="number"
          name="amount"
          id="budgetform-amount-input"
          min="0"
          value={formData.amount}
          onChange={handleChange}
        />
        <button type="submit">{budgetId ? 'Submit Changes' : 'Submit New Budget'}</button>
      </form>
    </main>
  );
}

export default BudgetForm;