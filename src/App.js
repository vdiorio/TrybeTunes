import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from './pages/Components/Album';
import Login from './pages/Components/Login';
import Search from './pages/Components/Search';
import Favorites from './pages/Components/Favorites';
import Profile from './pages/Components/Profile';
import ProfileEdit from './pages/Components/ProfileEdit';
import NotFound from './pages/Components/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="*" component={ NotFound } />
        </Switch>

      </BrowserRouter>
    );
  }
}

export default App;
