import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import * as budgetService from '../../services/budgetService'
import { StyledLink, StyledSection, StyledBudgetButtonDiv } from './style'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const ExpenseDetails = (props) => {
  const { budgetId, expenseId } = useParams()
  const [expense, setExpense] = useState([])
  const navigate = useNavigate()

  const initialState = { text: '' }

  const [formData, setFormData] = useState(initialState)

  const fetchExpense = async () => {
    const expenseData = await budgetService.showExpense(budgetId, expenseId)
    setExpense(expenseData)
  }



  const handleChange = (evt) => {
    setFormData({ [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    props.handleAddNote(budgetId, expenseId, formData)
    setFormData(initialState)
    fetchExpense()
  }

  const handleDeleteNote = async (noteId) => {
    props.handleDeleteNote(budgetId, expenseId, noteId)
    // fetchExpense()
  }

  useEffect(() => {
    fetchExpense()
  }, [expenseId, handleDeleteNote])

  return (
    <main>
      <header>
        <h1>{expense.name}</h1>
        <p>Created on {new Date(expense.createdAt).toLocaleDateString()} at {new Date(expense.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        <p>Expense Type: {expense.type}</p>
        <p>Expense Amount: {expense.amount}</p>
        <StyledBudgetButtonDiv>
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled button group"
          >
            <Button
              onClick={() => { navigate(`/budgets/${budgetId}/expenses/${expenseId}/edit`) }}
              sx={{
                bgcolor: 'rgb(67,146,138)',
                color: 'rgb(232, 241, 220)',
                '&:hover': {
                }
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => { props.handleDeleteExpense(budgetId, expenseId) }}
              sx={{
                bgcolor: 'rgb(67,146,138)',
                color: 'rgb(232, 241, 220)',
                '&:hover': {
                }
              }}
            >
              Delete
            </Button>
          </ButtonGroup>
          <Link to={`/budgets/${budgetId}`}>Go Back</Link>
        </StyledBudgetButtonDiv>
      </header>
      <section>
        <h2>Expense Notes:</h2>
        {expense?.notes?.length
          ? <>
            <List sx={{ width: '100%', maxWidth: 360, fontFamily: 'Poppins' }}>
              {expense.notes.map(note => (
                <ListItem disablePadding>
                  <ListItemText
                    primary={`Note: ${note.text}`}
                    secondary={
                      `Created: ${new Date(note.createdAt).toLocaleDateString()} at ${new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                    }
                  />
                </ListItem>


              ))}
            </List>
            {props.isFormOpen &&
              <Box
                component="form"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  '& .MuiTextField-root': { m: 1, width: '25ch' }
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <TextField
                  multiline
                  rows={4}
                  label="Expense Note"
                  variant="filled"
                  required
                  type="text"
                  name="text"
                  id="note-input"
                  value={expense.text}
                  onChange={handleChange}
                />
                <Button type="submit" variant="contained" size="medium">Submit</Button>
              </Box>
            }

            <Button
              onClick={() => { props.setIsFormOpen(!props.isFormOpen) }}
              variant="contained"
              size="medium">
              {!props.isFormOpen ? 'Add Notes' : 'Cancel'}
            </Button>

          </>
          :
          <>
            {!props.isFormOpen
              ?
              <>
                <p>There are no notes</p>
                <Button
                  onClick={() => { props.setIsFormOpen(!props.isFormOpen) }}
                  variant="contained"
                  size="medium">
                  {!props.isFormOpen ? 'Add Notes' : 'Cancel'}
                </Button>
              </>
              :
              <>
                <Box
                  component="form"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& .MuiTextField-root': { m: 1, width: '25ch' }
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <TextField
                    multiline
                    rows={4}
                    label="Expense Note"
                    variant="filled"
                    required
                    type="text"
                    name="text"
                    id="note-input"
                    value={expense.text}
                    onChange={handleChange}
                  />
                  <Button type="submit" variant="contained" size="medium">Submit</Button>
                </Box>
                <Button
                  onClick={() => { props.setIsFormOpen(!props.isFormOpen) }}
                  variant="contained"
                  size="medium">
                  {!props.isFormOpen ? 'Add Notes' : 'Cancel'}
                </Button>
              </>
            }
          </>
        }
      </section>
    </main>
  );
}

export default ExpenseDetails;