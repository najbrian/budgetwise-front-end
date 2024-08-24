import { useState, useEffect, createContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Landing from './components/Landing/Landing'
import Dashboard from './components/Dashboard/Dashboard'
import SignupForm from './components/SignupForm/SignupForm'
import SigninForm from './components/SigninForm/SigninForm'
import BudgetList from './components/BudgetList/BudgetList'
import BudgetDetails from './components/BudgetDetails/BudgetDetails'
import * as authService from '../src/services/authService' // import the authservice
import * as budgetService from './services/budgetService'
import BudgetForm from './components/BudgetForm/BudgetForm'
import ExpenseForm from './components/ExpenseForm/ExpenseForm'
import ExpenseDetails from './components/ExpenseDetails/ExpenseDetails'


export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [budgets, setBudgets] = useState([])
  // const [expenses, setExpenses] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchBudgets = async () => {
      const budgetData = await budgetService.indexBudgets()
      setBudgets(budgetData)
    }
    if(user) fetchBudgets()
  }, [user])

  const handleAddBudget = async (budgetData) => {
    const newBudget = await budgetService.createBudget(budgetData)
    setBudgets([newBudget, ...budgets])
    navigate('/budgets')
  }

  const handleUpdateBudget = async (budgetId, budgetData) => {
    const updatedBudget = await budgetService.updateBudget(budgetId, budgetData)
    setBudgets(budgets.filter((budget) => budgetId === budget._id ? updatedBudget : budget))
    navigate(`/budgets/${budgetId}`)
  }
  
  const handleDeleteBudget = async (budgetId) => {
    const deletedBudget = await budgetService.deleteBudget(budgetId)
    setBudgets(budgets.filter((budget) => budget._id !== deletedBudget._id))
    navigate('/budgets')
  }

  const handleAddExpense = async (budgetId, expenseData) => {
    const addExpense = await budgetService.createExpense(budgetId, expenseData)
    // setExpenses(addExpense)
    navigate(`/budgets/${budgetId}`)
  }


  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/budgets" element={<BudgetList budgets={budgets}/>} />
              <Route path="/budgets/new" element={<BudgetForm handleAddBudget={handleAddBudget}/>} />
              <Route path="/budgets/:budgetId" element={<BudgetDetails handleDeleteBudget={handleDeleteBudget}/>} />
              <Route path="/budgets/:budgetId/edit" element={<BudgetForm handleUpdateBudget={handleUpdateBudget} />}/>
              <Route path="/budgets/:budgetId/expenses/new" element={<ExpenseForm handleAddExpense={handleAddExpense}/>}/>
              <Route path="/budgets/:budgetId/expenses/:expenseId" element={<ExpenseDetails />}/>
            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
