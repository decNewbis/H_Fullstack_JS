import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { CategoryPage } from "./pages/CategoryPage";
import './App.css';
import {DishDetails} from "./pages/DishDetails";
import {AppWrapper} from "./styledComponents/App";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home />}/>
        <Route path="/category/:category" element={<CategoryPage />}/>
        <Route path="/dish/:dishId" element={<DishDetails></DishDetails>} />
      </Route>
    </>
  )
);

export const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

