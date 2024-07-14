import { NavLink } from "react-router-dom";
import { API } from '../../constants'
import { useData } from '../../hooks';
import { List, ListItem, ListItemButton, ListItemText, ListSubheader } from "@mui/material";



export const AsideCategory = () => {
  const data = useData(API.categories)


  if(!data?.meals) {
    return null
  }

  return (
    <List>
      <ListSubheader component="div">
        Category
      </ListSubheader>
      {data?.meals?.map(({strCategory}) => (
        <ListItem key={strCategory} disablePadding>
          <ListItemButton component={NavLink} to={`/category/${strCategory}`}>
            <ListItemText primary={strCategory} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}