import { useSelector } from 'react-redux'
import {Meal} from "../Meal";
// import { decrement, increment } from './counterSlice'

export const Profile = () => {
  const meals = useSelector((state) => state.meals)
  const ifMealsAvailable = meals.length
  console.log('meals', meals)




  return (
    <main>
      <h1>My Profile</h1>
      {ifMealsAvailable ?
        meals.map(({id, image, name, ingredients}) => {
          return (<Meal key={id} id={id} image={image} name={name} ingredients={ingredients}/>)
        })
         : <p>Please choose meals from previous pages</p>}
      <hr/>

    </main>
  )
}