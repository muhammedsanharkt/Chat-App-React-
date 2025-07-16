// App.jsx (fixed routes)

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import UserList from './components/UserList';
import ChatWindow from './components/ChatWindow';
import Home from './components/Home'; // ✅ your landing page!
import { useState, useEffect } from 'react';
import { db } from './firebase';
import { ref, onValue } from 'firebase/database';

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, 'users');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val() || {};
      const userList = Object.values(data);
      setUsers(userList);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* ✅ Landing page */}
        <Route path="/register" element={<Register setUsers={setUsers} users={users} />} />
        <Route path="/login" element={<Login users={users} setCurrentUser={setCurrentUser} />} />
        <Route path="/users" element={<UserList users={users} currentUser={currentUser} />} />
        <Route
          path="/chat/:withUser"
          element={
            <ChatWindow
              messages={messages}
              setMessages={setMessages}
              currentUser={currentUser}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
