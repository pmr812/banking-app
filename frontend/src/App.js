import React from 'react';
import { useSelector } from 'react-redux';
import { UsersList } from './components/UsersList/UsersList';
import { UserCard } from './components/UserCard/UserCard';
import { selectUserState } from "./store/selectors";
import './App.css';

function App() {
  const userState = useSelector(selectUserState);
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="app-container">
        <UsersList />
        {userState?.user?.id ? <UserCard /> : <div className="placeholder">Please, select a user</div>}
      </div>
    </div>
  );
}

export default App;
