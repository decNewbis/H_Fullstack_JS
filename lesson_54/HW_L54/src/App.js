import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { CategoryPage } from "./pages/CategoryPage";
import { Meal } from "./pages/Meal";
import { Profile } from "./pages/Profile";
import './App.css';
import {withMealIdRequest} from "./HOC/withMealIdRequest";

const MealId = withMealIdRequest(Meal);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home />}/>
        <Route path="/category/:category" element={<CategoryPage />}/>
        <Route path=":mealId" element={<MealId />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<div>Cart page</div>} />
      </Route>
    </>
  )
);

export const App = () => {
  return (

    <RouterProvider router={router} />
  );
}

