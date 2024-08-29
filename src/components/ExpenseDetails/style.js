import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledSection = styled.section`
display: flex;
flex-direction: column;
align-items: center;
`

const StyledLink = styled(Link)`
text-decoration: none;
color: black;
`

const StyledBudgetButtonDiv= styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

`

export {
  StyledSection,
  StyledLink,
  StyledBudgetButtonDiv
}