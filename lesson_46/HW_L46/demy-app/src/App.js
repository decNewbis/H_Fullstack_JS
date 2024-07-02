import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Header} from "./components/Header";
import {Main} from "./components/Main";
import {Homepage} from "./pages/Homepage";
import {SignUp} from "./pages/SignUp";
import {LINKS} from "./constants";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path={LINKS.homepage} element={<Main />}>
            <Route path={LINKS.homepage} element={<Homepage />} />
            <Route path={LINKS.courses} element={<Homepage />} />
            <Route path={LINKS.profile} element={<Homepage />} />
            <Route path={LINKS.registration} element={<SignUp />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export { App };
