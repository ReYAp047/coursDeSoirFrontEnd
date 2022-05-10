import SideBar from './components/Sidebar/SideBar';
import TopBar from './components/Topbar/TopBar';
import "./App.css";
import Home from './pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Cours from './components/Cours/Cours';
import Students from './components/Students/Students';


function App() {
  return (
    <>
      <TopBar />
      <div className='container'>
      <SideBar />
      <div className='main-pages'>
        <Routes>
          <Route exact path='/' element={ <Home/> } />
          <Route path='/cours' element={ <Cours/> } />
          <Route path='/students' element={ <Students/> } />
        </Routes>
      </div>
      </div>
    </>
  );
}

export default App;
