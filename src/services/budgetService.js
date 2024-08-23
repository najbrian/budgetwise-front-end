const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/budgets`

const index = async () => {
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

const show = async (budgetId) => {
  try{
    const res = fetch(`${BASE_URL}/${budgetId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export {
  index,
}