import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login({ users, setCurrentUser }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate loading for better UX
    setTimeout(() => {
      if (users.includes(username)) {
        setCurrentUser(username);
        navigate('/users');
      } else {
        setError('User not found. Please register first!');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-3"
                       style={{ width: '60px', height: '60px' }}>
                    <i className="fas fa-sign-in-alt fa-lg"></i>
                  </div>
                  <h2 className="fw-bold text-primary mb-2">Welcome Back</h2>
                  <p className="text-muted">Sign in to your account</p>
                </div>

                {error && (
                  <div className="alert alert-danger d-flex align-items-center mb-3" role="alert">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    <div>{error}</div>
                  </div>
                )}

                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label htmlFor="username" className="form-label fw-semibold">
                      <i className="fas fa-user me-2 text-muted"></i>
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-control form-control-lg"
                      placeholder="Enter your username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg w-100 mb-3"
                    disabled={isLoading || !username.trim()}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Signing in...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt me-2"></i>
                        Sign In
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center">
                  <hr className="my-4" />
                  <p className="text-muted mb-0">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary text-decoration-none fw-semibold">
                      Sign up here
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="card mt-4 border-0 bg-transparent">
              <div className="card-body text-center">
                <div className="row">
                  <div className="col-4">
                    <i className="fas fa-shield-alt text-success mb-2" style={{ fontSize: '1.5rem' }}></i>
                    <small className="text-muted d-block">Secure</small>
                  </div>
                  <div className="col-4">
                    <i className="fas fa-bolt text-warning mb-2" style={{ fontSize: '1.5rem' }}></i>
                    <small className="text-muted d-block">Fast</small>
                  </div>
                  <div className="col-4">
                    <i className="fas fa-comments text-info mb-2" style={{ fontSize: '1.5rem' }}></i>
                    <small className="text-muted d-block">Chat</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;