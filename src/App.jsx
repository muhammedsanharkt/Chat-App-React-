import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import UserList from './components/UserList';
import ChatWindow from './components/ChatWindow';
import { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState(['snhr', 'john']);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []);

  const handleSetCurrentUser = (user) => {
    localStorage.setItem('currentUser', user);
    setCurrentUser(user);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register setUsers={setUsers} users={users} />} />
        <Route path="/login" element={<Login users={users} setCurrentUser={handleSetCurrentUser} />} />
        <Route path="/users" element={<UserList users={users} currentUser={currentUser} />} />
        <Route path="/chat/:withUser" element={<ChatWindow currentUser={currentUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
