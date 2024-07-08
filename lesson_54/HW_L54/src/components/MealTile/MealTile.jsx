import {useState} from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { CardActions, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";


export const MealTile = ({idMeal, strMeal, strMealThumb, addToCart, cart}) => {
  const [isLoading, setisLoading] = useState(false);
  console.log('cart', cart);
  const isAddedToCart = cart.meals[idMeal]

  const handleClick = () => {
    addToCart(idMeal)
    setisLoading(true);
  }

  const getButtonStatus = () => {
    if (isAddedToCart) {
      return "Added"
    }

    if (isLoading) {
      return "loading ..."
    } else {
      return "+ Add"
    }
  }

  return (
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

          <Button disabled={isLoading || isAddedToCart} onClick={handleClick} size="small">
            {getButtonStatus()}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
