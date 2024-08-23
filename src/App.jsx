import { useState, useEffect, createContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Landing from './components/Landing/Landing'
import Dashboard from './components/Dashboard/Dashboard'
import SignupForm from './components/SignupForm/SignupForm'
import SigninForm from './components/SigninForm/SigninForm'
import BudgetList from './components/BudgetList/BudgetList'
import * as authService from '../src/services/authService' // import the authservice
import * as budgetService from './services/budgetService'
import BudgetDetails from './components/BudgetDetails/BudgetDetails'


export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [budgets, setBudgets] = useState([])

  useEffect(() => {
    const fetchBudgets = async () => {
      const budgetData = await budgetService.index()
      setBudgets(budgetData)
    }
    if(user) fetchBudgets()
  }, [user])

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
              <Route path="/budgets/:budgetId" element={<BudgetDetails />}/>
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
