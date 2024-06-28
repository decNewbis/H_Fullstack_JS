import './App.css';

// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Link,
//   Outlet,
//   useParams,
//   // useLocation,
// } from "react-router-dom";
//
// const Component1 = () => {
//   return <div>Root</div>
// }
//
// const Component2 = () => {
//   return <div>Component 2</div>
// }
//
// const Component3 = () => {
//   // let location = useLocation();
//   // console.log('location', location);
//   let { page } = useParams();
//   console.log('page:', page);
//
//   return <div>Component 3</div>
// }
//
// function Users() {
//   return (
//     <div>
//       <nav>
//         <Link to="me">Component 2 - Me</Link>
//         <br/>
//         <Link to="somePath">Component 3</Link>
//       </nav>
//       <Outlet />
//       <p>Content for Users</p>
//       <div>Footer</div>
//     </div>
//   );
// }
//
// export const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Component1 />} />
//         <Route path="users" element={<Users />} >
//           <Route path="me" element={<Component2 />} />
//           <Route path=":page" element={<Component3 />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
  // useLocation,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import {useEffect, useState} from "react";

const Component1 = () => {
  return <div>Root</div>
}


// const Component2 = () => {
//   const [ data, setData ] = useState([]);
//   useEffect(() => {
//     (async () => {
//       const response = await fetch("https://jsonplaceholder.typicode.com/posts")
//       const posts = await response.json();
//       setData(posts);
//     })()
//   }, []);
//
//   console.log(data)
//
//   return <div>some data</div>
// }

const Component2Loader = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
  const posts = await response.json();
  return posts[0].title
}

const Component2 = () => {
  const title = useLoaderData();
  const navigation= useNavigation()

  console.log(navigation.state);

  // if(navigation.state === "loading") {
  //   console.log('----LOADING-----')
  //   return <p>Loading...</p>
  // }

  return <div>{title}</div>
}





const Component3 = () => {
  // let location = useLocation();
  // console.log('location', location);
  let { page } = useParams();
  console.log('page:', page);

  return <div>Component 3</div>
}

function Users() {
  return (
    <div>
      <nav>
        <Link to="/path">Component 2 - Me</Link>
        <br/>
        <Link to="somePath">Component 3</Link>
      </nav>
      <Outlet />
      <p>Content for Users</p>
      <div>Footer</div>
    </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Component1 />} />
      <Route path="users" element={<Users />} >
        <Route path=":page" element={<Component3 />} />
      </Route>
      <Route path="path" element={<Component2 />} loader={Component2Loader} />
    </>
  )
);

export const App_for_Router = () => {
  return (
    <RouterProvider router={router} />
  );
}

