import './App.css';
//axios
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import NoteState from './context/notes/NoteState';
import Signup from './pages/Signup';
import Login from './pages/Login'
import Homelayout from './layout/Home.about.layout';
import Loginlayout from './layout/Login.Signup.layout';
import UserLoggedin from './context/User/UserLoggedin';
import Note from './components/Note';
import EditToggle from './context/edit/EditToggle';


//axios default settings
// axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.baseURL = 'https://mynotes-backend-1301.herokuapp.com/';
axios.defaults.params = {};



function App() {

  return (
    <>
      <Router>
        <UserLoggedin>
        <EditToggle>
        
          <NoteState>
            <Switch>
              <div className="container mx-auto px-4 lg:px-20">
                <Route exact path="/">
                  <Homelayout>
                    <Home />
                  </Homelayout>
                </Route>
                <Route exact path="/about">
                  <Loginlayout>
                    <About />
                  </Loginlayout>
                </Route>
                <Route exact path="/signup">
                  <Loginlayout className="relative" >
                    <Signup />
                  </Loginlayout>
                </Route>
                <Route exact path="/login">
                  <Loginlayout>
                    <Login />
                  </Loginlayout>
                </Route>
                <Route exact path="/note/:id">
                  <Loginlayout>
                    <Note />
                  </Loginlayout>
                </Route>
              </div>

            </Switch>
          </NoteState>
            
        </EditToggle>
        </UserLoggedin>
      </Router>

    </>
  );
}

export default App;
