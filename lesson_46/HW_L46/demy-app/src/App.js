import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Header} from "./components/Header";
import {Main} from "./components/Main";
import {Homepage} from "./components/Homepage";
import {SignUp} from "./components/SignUp";
import {LINKS} from "./constants";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path={LINKS.homepage} element={<Main />}>
            <Route path={LINKS.homepage} element={<Homepage />}></Route>
            <Route path={LINKS.registration} element={<SignUp />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export { App };
