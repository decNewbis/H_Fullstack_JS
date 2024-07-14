import { THEME } from "../../constants";
import styled from 'styled-components'

export const Header = styled.header`
  min-height: 50px;
  display: flex;
  justify-content: space-between;  
  text-align: center;
  padding: 15px;
  background-color: ${({theme}) => {
    return theme === THEME.DARK? "brown" : "beige"
  }};
`