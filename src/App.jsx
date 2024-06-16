
import './App.css'
import Header from './Component/Header/Header';
import Repositories from './Component/Repositories';
import Search from './Component/Search';
import UserProfile from './Component/UserProfile';

function App() {
  
  return (
    <>
    <Header/>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '40vw', height: '90vh' }}>
        <Search />
        <UserProfile />
      </div>
      <div style={{ width: '60vw', height: '90vh' }}>
        <Repositories />
     
      </div>
    </div>
    </>
  )
}

export default App
