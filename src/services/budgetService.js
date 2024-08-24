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
    const res = await fetch (BASE_URL, {
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


export {
  indexBudgets,
  showBudget,
  createBudget,
}