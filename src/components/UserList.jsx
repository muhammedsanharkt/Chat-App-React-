import { Link } from 'react-router-dom';

function UserList({ users, currentUser }) {
  const otherUsers = users.filter(user => user !== currentUser);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">
                <i className="fas fa-user me-2"></i>
                Welcome, {currentUser}
              </h4>
            </div>
            <div className="card-body">
              <h5 className="card-title text-muted mb-3">
                <i className="fas fa-comments me-2"></i>
                Start chatting with:
              </h5>

              {otherUsers.length === 0 ? (
                <div className="alert alert-info" role="alert">
                  <i className="fas fa-info-circle me-2"></i>
                  No other users found. Add more users or open another tab!
                </div>
              ) : (
                <div className="list-group list-group-flush">
                  {otherUsers.map(user => (
                    <Link
                      key={user}
                      to={`/chat/${user}`}
                      className="list-group-item list-group-item-action d-flex align-items-center py-3 text-decoration-none"
                    >
                      <div className="me-3">
                        <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center" 
                             style={{ width: '40px', height: '40px' }}>
                          <i className="fas fa-user text-white"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-0 text-dark">{user}</h6>
                        <small className="text-muted">Click to start chatting</small>
                      </div>
                      <div className="text-muted">
                        <i className="fas fa-chevron-right"></i>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;