import { useState } from "react";

const BudgetForm = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
  })

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.handleAddBudget(formData)
    setFormData({
      name: '',
      amount: '',
    })
  }

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>Add New Budget</h1>
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
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default BudgetForm;