
import "./App.css";
import Home from './pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Cours from './components/Cours/Cours';
import Students from './components/Students/Students';
import Login from "./components/Login/Login";


function App() {
  return (
    <>
      <div className='container'>
      <div className='main-pages'>
        <Routes>
          <Route exact path='/' element={ <Home/> } />
          <Route path='/cours' element={ <Cours/> } />
          <Route path='/students' element={ <Students/> } />
          <Route path="/login" element={ <Login/> } />
        </Routes>
      </div>
      </div>
    </>
  );
}

export default App;
