import { Route, NavLink, Routes } from 'react-router-dom';
import Form from './components/Form';
import View from './pages/View';
import './App.css';

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
        <Route path='create' element={<Form type="post" />}></Route>
        <Route path='' element={<View />}></Route>
      </Routes>
    </div >
  );
}

export default App;
