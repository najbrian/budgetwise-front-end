import { Link } from "react-router-dom";

const BudgetList = (props) => {

  return (
    <main>
      <h1>My Budgets</h1>
      <ul>
        {props.budgets.map((budget) => (
          <Link key={budget._id} to={`/budgets/${budget._id}`}>
            <li>{budget.name}</li>
          </Link>
        ))}
      </ul>
      <Link to={'/budgets/new'}><p>Add New Budget</p></Link>
    </main>
  );
}

export default BudgetList;