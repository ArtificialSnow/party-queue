import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Room from './pages/RoomPage.js';
import CreateRoom from './pages/CreateRoomPage.js'
import HomePage from './pages/HomePage.js';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/CreateRoomPage' component={CreateRoom}/>
        <Route path='/RoomPage' component={Room} />
        <Route path="*">
          <Redirect to='/' />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
