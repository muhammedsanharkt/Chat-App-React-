// Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { ref, push } from 'firebase/database';

function Register({ users, setUsers }) {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    if (users.includes(username)) {
      alert('User already exists!');
      return;
    }

    // Add to local state
    setUsers([...users, username]);

    // ✅ Add to Firebase
    const usersRef = ref(db, 'users');
    push(usersRef, username);

    alert('Registered! Now log in.');
    navigate('/login');
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
