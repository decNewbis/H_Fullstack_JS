import styled, { css } from 'styled-components'

const borderColorMain = "#BF4F74"

export const Button = styled.button`
  background: ${({ bgColor }) => bgColor ? bgColor : 'transparent' };
  border-radius: 3px;
  border: 2px solid ${borderColorMain};
  color: #BF4F74;
  margin: 0 1em;
  padding: 0.25em 1em;
    
  ${({custom}) => custom && css`
    color: black;
  ` }
`