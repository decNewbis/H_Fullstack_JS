import styled from "styled-components";

export const Image = styled.img`
    padding: 16px;
    margin: 0;
    max-width: ${({maxWidth}) => maxWidth || '100%'};
  `