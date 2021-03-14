import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import UserList from './components/UserList/UserList';
import User from './components/User/User';
import AddNewUser from './components/AddNewUser/AddNewUser';
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Header/>
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <Login />
            </Route>
            <Route path="/login" component={Login} />
            <Route exact path="/users" component={UserList} />
            <Route path="/users/:id" component={User} />
            <Route exact path="/adduser" component={AddNewUser} />
          </Switch>
       </div>
   </div>
  </Router>
  );
}

export default App;
