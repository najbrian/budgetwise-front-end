import { useState, useEffect, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import CommentForm from "../CommentForm/CommentForm"
import { AuthedUserContext } from "../../App"
import * as budgetService from "../../services/budgetService"


const BudgetDetails = (props) => {
  const { budgetId } = useParams()
  const [budget, setBudget] = useState(null)
  const user = useContext(AuthedUserContext)

  useEffect (() => {
    const fetchBudget = async () => {
      const budgetData = await 
    }
  })


  return (<h1>details</h1>);
}

export default BudgetDetails
  ;