import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Room from './pages/Room';
import Main from './pages/Main';
import Login from './pages/Login';
import NotFound404 from './pages/NotFound404';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/room/:id' component={Room}/>
        <Route exact path='/rooms' component={Main}/>
        <Route exact path='/' component={Login}/>
        <Route component={NotFound404}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
