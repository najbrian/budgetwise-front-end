import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as budgetService from '../../services/budgetService'
import { } from './style'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const ExpenseForm = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    type: 'Misc'
  })

  const { budgetId, expenseId } = useParams()

  useEffect(() => {
    const fetchExpense = async () => {
      const expenseData = await budgetService.showExpense(budgetId, expenseId)
      setFormData(expenseData)
    }
    if (expenseId) fetchExpense()
  }, [expenseId])

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (expenseId) {
      props.handleUpdateExpense(budgetId, expenseId, formData)
    } else {
      props.handleAddExpense(budgetId, formData)
    }
  }

  return (
    <main>
      <h1>{expenseId ? 'Edit Expense' : 'New Expense'}</h1>
      <form onSubmit={handleSubmit}>
        <Box sx={{ 
          minWidth: 120,
          display: 'flex',
          justifyContent: 'center',
          }} >

          <TextField
            required
            label="Expense Name"
            variant="filled"
            type="text"
            name="name"
            id="expenseform-name-input"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            required
            label="Amount($)"
            variant="filled"
            type="number"
            name="amount"
            id="expenseform-amount-input"
            min="0"
            value={formData.amount}
            onChange={handleChange}
          />
          <FormControl sx={{width: '250px'}}>
            <InputLabel htmlFor="expenseform-type-input">Expense Type</InputLabel>
            <Select
              required
              labelId="expenseform-type-input"
              id="expenseform-type-input"
              name='type'
              value={formData.type}
              label="Expense Type"
              onChange={handleChange}
            >
              <MenuItem value="Rent/Mortgage">Rent/Mortgage</MenuItem>
              <MenuItem value="Subscription">Subscription</MenuItem>
              <MenuItem value="Groceries">Groceries</MenuItem>
              <MenuItem value="Dining Out">Dining Out</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
              <MenuItem value="Credit Card">Credit Card Payment</MenuItem>
              <MenuItem value="Misc">Misc.</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" type='submit'>{expenseId ? "Submit Changes" : "Submit Expense"}</Button>

        </Box>
      </form>
      {/* <form onSubmit={handleSubmit}>
        <h1>{expenseId ? 'Edit Expense' : 'New Expense'}</h1>
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

        <button type="submit">{expenseId ? "Submit Changes" : "Submit Expense"}</button>
      </form> */}
    </main>
  );
}

export default ExpenseForm;