import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import Room from './pages/room.js';
import Home from './pages/home.js';

export default function App() {
  return (
    <div className='App'>
      <div className='root'>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/room/:roomId' component={Room} />
          <Route path="*">
            <Redirect to='/' />
          </Route>
        </Switch>
      </div>
      <div id='modal-root'></div>
    </div>
  );
}

export function DisplayModalErrorMessage(message) {
  const modalRoot = document.querySelector('#modal-root');

  //Temporary
  alert(message);

  return ReactDOM.createPortal(
    <div className='error-dialog'>
      <label>{message}</label>
    </div>
    , modalRoot);
}
