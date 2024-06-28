import {useParams} from "react-router-dom";
import {Grid, Typography, List, ListItem, ListItemText} from "@mui/material";
import {useData} from "../../hooks";
import {Main} from "../../styledComponents/Main";
import {Paragraph} from "../../styledComponents/Paragraph";
import {Image} from "../../styledComponents/Image";
import {API} from "../../constants";


export const DishDetails = () => {
  let {dishId} = useParams();
  const data = useData(`${API.dishDetails}${dishId}`)
  console.log('data', data)

  if(!data?.meals) {
    return null;
  }
  const dataDetails = data.meals[0];

  const ingredients = [];
  for (let i=1; i <= 20; i++) {
    const ingredient = dataDetails[`strIngredient${i}`];
    const measure = dataDetails[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push({ id: i, ingredient, measure });
    }
  }
  console.log('ingredients', ingredients);

  return (
    <Main>
      <Grid container spacing={2} sx={{minWidth: 720, maxWidth: 855}}>
        <Grid item xs={6}>
          <Typography sx={{ mt: 2, mb: 0, ml: 2, mr: 1 }} variant="h6" component="div">
            {dataDetails.strMeal}
          </Typography>
          <Image src={dataDetails.strMealThumb} alt={dataDetails.strMeal} maxWidth="350px" />
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ mt: 2, mb: 1 }} variant="h6" component="div">
            Ingredients:
          </Typography>
          <List dense={false}>
          {ingredients.map(({ id, ingredient, measure }) => (
            <ListItem sx={{pt:0, pb:0}}>
              <ListItemText
                primary={`${id}. ${ingredient}: ${measure}`}
              />
              <Image src={`${API.ingredientThumbnail}${ingredient}-Small.png`} alt={ingredient} maxWidth='45px' pd='0' />
            </ListItem>
          ))}
          </List>
        </Grid>
        <Grid item xs={12}>
          <h1>Instructions</h1>
          <Paragraph>{dataDetails.strInstructions}</Paragraph>
        </Grid>
      </Grid>
    </Main>
  );
}