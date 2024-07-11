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
import {CartPage} from "./pages/CartPage";

const MealId = withMealIdRequest(Meal);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home />}/>
        <Route path="/category/:category" element={<CategoryPage />}/>
        <Route path=":mealId" element={<MealId />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
    </>
  )
);

export const App = () => {
  return (

    <RouterProvider router={router} />
  );
}

