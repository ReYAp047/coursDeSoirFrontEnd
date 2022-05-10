import SideBar from './components/Sidebar/SideBar';
import TopBar from './components/Topbar/TopBar';
import "./App.css";
import Home from './pages/Home/Home';

function App() {
  return (
    <>
      <TopBar />
      <div className='container'>
      <SideBar />
      <div className='main-pages'>
        <Home/>
      </div>
      </div>
    </>
  );
}

export default App;
