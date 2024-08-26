import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import * as budgetService from '../../services/budgetService'

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
        <button onClick={() => { navigate(`/budgets/${budgetId}/expenses/${expenseId}/edit`) }}>Edit</button>
        <button onClick={() => { props.handleDeleteExpense(budgetId, expenseId) }}>Delete</button>
        <Link to={`/budgets/${budgetId}`}>Go Back</Link>
      </header>
      <section>
        <h2>Expense Notes:</h2>
        {expense?.notes?.length
          ? <>
            <ul>
              {expense.notes.map(note => {
                return (
                  <li key={note._id}>{note.owner.firstname}: {note.text}
                    <p>created on {new Date(note.createdAt).toLocaleDateString()} at {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
                  </li>
                )
              })}
            </ul>
            {props.isFormOpen &&
              <form onSubmit={handleSubmit}>
                <label>Note:</label>
                <textarea
                  required
                  type="text"
                  name="text"
                  id="note-input"
                  value={expense.text}
                  onChange={handleChange}
                />
                <button type="submit">Submit</button>
              </form>}

            <button onClick={() => { props.setIsFormOpen(!props.isFormOpen) }}>{!props.isFormOpen ? 'Add Notes' : 'Go Back'}</button>
          </>
          :
          <>
            {!props.isFormOpen
              ?
              <>
                <p>There are no notes</p>
                <button onClick={() => { props.setIsFormOpen(!props.isFormOpen) }}>Add Notes</button>
              </>
              :
              <>
                <form onSubmit={handleSubmit}>
                  <label>Note:</label>
                  <textarea
                    required
                    type="text"
                    name="text"
                    id="note-input"
                    value={formData.text}
                    onChange={handleChange}
                  />
                  <button type="submit">Submit</button>
                </form>
                <button onClick={() => { props.setIsFormOpen(!props.isFormOpen) }}>{!props.isFormOpen ? 'Add Notes' : 'Go Back'}</button>
              </>
            }
          </>
        }
      </section>
    </main>
  );
}

export default ExpenseDetails;