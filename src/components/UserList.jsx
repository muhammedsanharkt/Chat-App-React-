import { Link } from 'react-router-dom';

function UserList({ users, currentUser }) {
  const otherUsers = users.filter(user => user !== currentUser);

  return (
    <div>
      <h2>Welcome, {currentUser}</h2>
      <h3>Start chatting with:</h3>

      {otherUsers.length === 0 ? (
        <p>No other users found. Add more users or open another tab!</p>
      ) : (
        <ul>
          {otherUsers.map(user => (
            <li key={user}>
              <Link to={`/chat/${user}`}>{user}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
