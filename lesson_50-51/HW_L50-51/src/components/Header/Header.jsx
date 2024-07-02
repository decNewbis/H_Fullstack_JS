import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '../../styledComponents/Button';
import { Header as StyledHeader, HeaderWrapper } from '../../styledComponents/Header';

export const Header = () => {
  return (
    <StyledHeader>
      <HeaderWrapper>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField label="Search" variant="outlined" />
        </Box>
      </HeaderWrapper>
    </StyledHeader>
  )
}