import {Outlet} from 'react-router-dom';
import "./_main.scss";

export function Main() {
  return (
    <main>
      <Outlet />
    </main>
  );
}