import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as budgetService from '../../services/budgetService'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
    if (budgetId) fetchBudget()
  }, [budgetId])


  return (
    <main>
      <form onSubmit={handleSubmit}>
        <Box sx={{ minWidth: 120 }} >
          <h1>{budgetId ? `Edit Budget` : 'Create New Budget'}</h1>

          <TextField
            variant="filled"
            label="Budget Name"
            required
            type="text"
            name="name"
            id="budgetform-name-input"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            variant="filled"
            label="Budget Amount"
            required
            type="number"
            name="amount"
            id="budgetform-amount-input"
            min="0"
            value={formData.amount}
            onChange={handleChange}
          />
          <Button variant="contained" type='submit'>{budgetId ? 'Submit Changes' : 'Submit New Budget'}</Button>

        </Box>
      </form>
    </main>
  );
}

export default BudgetForm;