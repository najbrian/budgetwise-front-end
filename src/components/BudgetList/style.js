import styled from "styled-components";
import { Link } from "react-router-dom";

const Budgets=styled.div`
font-family: 'Poppins';
`

const StyledLinks = styled(Link)`
    text-decoration: none;
    color: black;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const StyledBudget = styled(Budgets)`
display: flex;  
justify-content: center;
`

export {
  Budgets,
  StyledLinks,
  StyledBudget
}