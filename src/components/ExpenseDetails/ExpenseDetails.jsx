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
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';


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
  }

  const handleDeleteNote = async (noteId) => {
    props.handleDeleteNote(budgetId, expenseId, noteId)
    setExpense({...expense, notes: expense.notes.filter((note) => note._id !== noteId)})
  }
  
  useEffect(() => {
    fetchExpense()
  }, [expenseId, props.handleAddNote])


  return (
    <main>
      <header>
        <h1>Expense: {expense.name}</h1>
        <p>Created on {new Date(expense.createdAt).toLocaleDateString()} at {new Date(expense.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} by <strong>{}</strong></p>
        <p>Expense Type: <strong>{expense.type}</strong></p>
        <p>Expense Amount: <strong>{expense.amount ? `$${expense.amount.toLocaleString('en-US')}` : 'Loading...'}</strong></p>
        <StyledBudgetButtonDiv>
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled button group"
          >
            <Button
              onClick={() => { navigate(`/budgets/${budgetId}/expenses/${expenseId}/edit`) }}
              sx={{
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
      <StyledSection>
        <h2>Expense Notes:</h2>
        {expense?.notes?.length
          ? <>
            <List sx={{ width: '100%', maxWidth: 500, display: 'flex', flexDirection: 'column' }}>
              {expense.notes.map(note => (
                <ListItem disablePadding key={note._id}>

                  <ListItemText
                    primary={`${note.text}`}
                    secondary={
                      `Created: ${new Date(note.createdAt).toLocaleDateString()} at ${new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} by ${note.owner.username}`
                    }
                  />
                  {note.owner._id === props.user._id &&
                  <DeleteTwoToneIcon
                    onClick={() => {handleDeleteNote(note._id)}}
                    sx={{cursor: 'pointer'}}
                  />
                }
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
      </StyledSection>
    </main>
  );
}

export default ExpenseDetails;