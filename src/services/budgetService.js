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
    console.log(res)
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
    console.log(res)
    return res.json()
  } catch (error) {
    console.log(error)
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
}