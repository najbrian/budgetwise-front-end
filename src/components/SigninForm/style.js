import styled from "styled-components"

const StyledMain=styled.main`
display: flex;
justify-content: space-evenly;

`

const StyledDiv = styled.div`
box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px rgba(0, 0, 0, 0.1);
border-radius: 10%;
padding-bottom: 30px;
width: 30%;

`


export {
  StyledMain,
  StyledDiv
}