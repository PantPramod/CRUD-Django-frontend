
import logo from './logo.svg';
import './App.css';
import { Route, NavLink, Routes } from 'react-router-dom';
import Create from './pages/Create/Create';
import View from './pages/View/View';
function App() {



  return (
    <div className="app">
      <nav>
        <ul>
          <li><NavLink to="create">Add Employee</NavLink></li>
          <li><NavLink to="">Show Employees</NavLink> </li>
        </ul>
      </nav>

      <Routes>
        <Route path='create' element={<Create />}></Route>
        <Route path='' element={<View />}></Route>
      </Routes>
    </div >
  );
}

export default App;
