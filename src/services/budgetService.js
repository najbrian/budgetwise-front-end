const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/budgets`

const indexBudgets = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const showBudget = async (budgetId) => {
  try {
    const res = await fetch(`${BASE_URL}/${budgetId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const createBudget = async (budgetFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(budgetFormData),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const updateBudget = async (budgetId, budgetFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${budgetId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(budgetFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

const deleteBudget = async (budgetId) => {
  try {
    const res = await fetch(`${BASE_URL}/${budgetId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

const showExpense = async (budgetId, expenseId) => {
  try {
    const res = await fetch(`${BASE_URL}/${budgetId}/expenses/${expenseId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}


const createExpense = async (budgetId, expenseData) => {
  try {
    const res = await fetch(`${BASE_URL}/${budgetId}/expenses`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseData),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const updateExpense = async (budgetId, expenseId, expenseFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${budgetId}/expenses/${expenseId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseFormData),
    });
    return res.json();
  } catch (error) {
    console.log(res);
    console.log(error);
  }
}

const deleteExpense = async (budgetId, expenseId) => {
  try {
    const res = await fetch(`${BASE_URL}/${budgetId}/expenses/${expenseId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

const createNote = async (budgetId, expenseId, noteData) => {
  try {
    const res = await fetch(`${BASE_URL}/${budgetId}/expenses/${expenseId}/notes`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteData),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const updateNote = async (budgetId, expenseId, noteId, noteData) => {
  try {
    const res = await fetch(`${BASE_URL}/${budgetId}/expenses/${expenseId}/notes/${noteId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteData),
    });
    return res.json();
  } catch (error) {
    console.log(res);
    console.log(error);
  }
}

const deleteNote = async (budgetId, expenseId, noteId) => {
  try {
    const res = await fetch(`${BASE_URL}/${budgetId}/expenses/${expenseId}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}


export {
  indexBudgets,
  showBudget,
  createBudget,
  updateBudget,
  deleteBudget,
  showExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  createNote,
  updateNote,
  deleteNote
}