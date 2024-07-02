import {useParams} from "react-router-dom";
import {Grid, Typography, List, ListItem, ListItemText} from "@mui/material";
import {useData, useMemoIngredients} from "../../hooks";
import {Main} from "../../styledComponents/Main";
import {Paragraph} from "../../styledComponents/Paragraph";
import {Image} from "../../styledComponents/Image";
import {API} from "../../constants";
import {useState, useEffect} from "react";


export const DishDetails = () => {
  let {dishId} = useParams();
  const [loading, setLoading] = useState(true);
  const [dataDetails, setDataDetails] = useState(null);
  const data = useData(`${API.dishDetails}${dishId}`);
  const ingredients = useMemoIngredients(dataDetails);

  useEffect(() => {
    if (data?.meals) {
      setDataDetails(data?.meals[0]);
      setLoading(false);
    }
  }, [data]);
  if(loading) {
    return null;
  }

  return (
    <Main>
      <Grid container spacing={2} sx={{minWidth: 720, maxWidth: 855}}>
        <Grid item xs={6}>
          <Typography sx={{ mt: 2, mb: 0, ml: 2, mr: 1 }} variant="h6" component="div">
            {dataDetails.strMeal}
          </Typography>
          <Image src={dataDetails.strMealThumb} alt={dataDetails.strMeal} style={{maxWidth: "350px"}} />
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ mt: 2, mb: 1 }} variant="h6" component="div">
            Ingredients:
          </Typography>

          <List dense={false}>
          {ingredients.map(({ id, ingredient, measure }) => (
            <ListItem key={id} sx={{pt:0, pb:0}}>
              <ListItemText
                primary={`${id}. ${ingredient}: ${measure}`}
              />
              <Image
                src={`${API.ingredientThumbnail}${ingredient}-Small.png`}
                alt={ingredient} style={{maxWidth: '45px'}} pd='0'
              />
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