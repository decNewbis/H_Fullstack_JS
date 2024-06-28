import {Link, useParams} from "react-router-dom";
import { useData } from "../../hooks";
import { API } from "../../constants";
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardMedia from "@mui/material/CardMedia";
import CardContent from '@mui/material/CardContent';
import { CardActions, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import {Main} from "../../styledComponents/Main";

export const CategoryPage = () => {
  let { category } = useParams();
  const data = useData(`${API.category}${category}`)

  console.log(data);

  if(!data?.meals) {
    return null;
  }

  return (
    <Main>
      <Grid container spacing={2}>
        {data.meals.map(({ idMeal, strMeal, strMealThumb }) => (
          <Grid key={idMeal} item xs={6} md={4}>
            <Card>
              <CardMedia
                sx={{ maxHeight: 140 }}
                component="img"
                alt={`picture of ${strMeal}`}
                image={strMealThumb}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div"
                  title={strMeal}
                  sx={{
                    maxHeight: 80,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}
                >
                  {strMeal}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">
                  <Link to={`/dish/${idMeal}`}>Details</Link>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Main>
  )
}