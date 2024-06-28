import styled from "styled-components";

export const Image = styled.img`
    padding: ${({pd}) => pd || '16px'};
    margin: 0;
    max-width: ${({maxWidth}) => maxWidth || '100%'};
  `