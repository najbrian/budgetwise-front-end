import styled from 'styled-components';

const StyledNavLoggedIn = styled.nav`
display: flex;
justify-content: space-between;
align-items: center;
width: '100vw';
opacity: 0.8;
`
const StyledNav = styled.nav`
display: flex;
justify-content: space-between;
align-content: center;
width: '100vw';
`

const StyledImg = styled.img`
height: 50px;
width: auto 0;
&:hover {
cursor: pointer;
}
`

const LogoDiv = styled.div`
display: flex;
align-items: center;
`

const StyledH2 = styled.h2`
cursor: pointer;
`
const GuestDiv = styled.div`
display: flex;
margin-bottom: 50px;
`

export {
  StyledNav,
  StyledImg,
  StyledNavLoggedIn,
  LogoDiv,
  StyledH2,
  GuestDiv
}