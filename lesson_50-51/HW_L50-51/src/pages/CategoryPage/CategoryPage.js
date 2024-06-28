// import { useMemo, useCallback } from "react";
import {Link, useParams} from "react-router-dom";
import { useData } from "../../hooks";
import { API } from "../../constants";
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardMedia from "@mui/material/CardMedia";
import CardContent from '@mui/material/CardContent';
import { CardActions, Typography } from "@mui/material";
import Button from '@mui/material/Button';

// const CategoryList = ({categories}) => {
//   const sortedCategory = useMemo(() => categories.sort((a, b) => a.strMeal > b.strMeal ? 1 : -1), [categories])
// }

export const CategoryPage = () => {
  let { category } = useParams();
  const data = useData(`${API.category}${category}`)

  console.log(data);

  if(!data?.meals) {
    return null;
  }

  return (
    <main>
      <Grid container spacing={2}>
        {data.meals.map(({ idMeal, strMeal, strMealThumb }) => (
          <Grid key={idMeal} item xs={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt={`picture of ${strMeal}`}
                height="140"
                image={strMealThumb}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {strMeal}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">
                  <Link to={`/${idMeal}`}>Details</Link>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </main>
  )
}