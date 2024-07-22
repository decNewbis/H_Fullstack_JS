import {FC} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Header} from "./components/Header";
import {Main} from "./components/Main";
import {Homepage} from "./pages/Homepage";
import {SignUp} from "./pages/SignUp";
import {Links} from "./constants";
import {CoursesPage} from "./pages/CoursesPage";
import {ProfilePage} from "./pages/ProfilePage";

const App:FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path={Links.HOMEPAGE} element={<Main />}>
            <Route path={Links.HOMEPAGE} element={<Homepage />} />
            <Route path={Links.COURSES} element={<CoursesPage />} />
            <Route path={Links.PROFILE} element={<ProfilePage />} />
            <Route path={Links.REGISTRATION} element={<SignUp />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export { App };
