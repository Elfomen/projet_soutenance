import './App.css';
import { useState , useEffect } from 'react'
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom'
import Body from './Components/Body/Body'
import NavBar from './Components/Navbar/Navbar'
import AppPrev from './AppPrev'
import RegisterAdministrator from './Components/Account/Admin/Create/Create'
import LoginInAdministrator from './Components/Account/Admin/Login/Login'
import LoginUser from './Components/Account/User/Login/Login'
import CreateUser from './Components/Account/User/Create/Create'
import DashboardList from './Components/Account/userDashBoard/DashboardList/Dashboard'
import UserPerso from './Components/Account/userDashBoard/DashboardList/Rigthside/Personal/PersonalPage'
import ChatComponent from './Components/Chat/indexChat'
import Pusher from 'pusher-js'
import Backdrop from './Components/Body/BackDrop/BackDrop'
import SideDrawer from './Components/Body/SideDrawer/SideDrawer'

function App() {

  const [ showSideDrawer , setSSD ] = useState(false)

  return (
    <div className="App">
      <Router>
      
       <Backdrop show={showSideDrawer} click={() => setSSD(false)}/>

        <SideDrawer show={showSideDrawer} click={() => setSSD(false)}/> 
        <Switch>
          <Route exact path="/registeradmin" component={RegisterAdministrator}/>
          <Route exact path="/" component={LoginInAdministrator}/>
          <Route exact path="/registeruser" component={CreateUser}/>
          <Route exact path="/loginuser" component={LoginUser}/>
          <Route exact path="/home" component={AppPrev}/>
          <Route exact path="/userdashboardlist" component={DashboardList}/>
          <Route exact path="/userpersonal" component={UserPerso}/>
          <Route exact path="/chatgroup/:id" component={ChatComponent}/>
          <Body show={showSideDrawer} click={() => setSSD(!showSideDrawer)}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
