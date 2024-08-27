import styled from 'styled-components';

const StyledNav = styled.nav`
display: flex;
justify-content: space-between;
align-items: center;
width: '100vw';
`

const StyledImg = styled.img`
width: 40px;

&:hover {
cursor: pointer;
}
`

export {
  StyledNav,
  StyledImg,
}