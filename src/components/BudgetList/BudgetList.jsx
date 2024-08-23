import { Link } from "react-router-dom";

const BudgetList = (props) => {
  console.log(props.budgets)
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
    </main>
  );
}

export default BudgetList;