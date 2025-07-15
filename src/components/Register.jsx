import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register({ users, setUsers }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!username.trim()) {
      setError('Username is required');
      setIsLoading(false);
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
      setIsLoading(false);
      return;
    }

    // Simulate loading for better UX
    setTimeout(() => {
      if (users.some(user => user === username)) {
        setError('Username already exists! Please choose a different one.');
        setIsLoading(false);
        return;
      }

      setUsers([...users, username]);
      setSuccess('Account created successfully! Redirecting to login...');
      
      // Redirect after showing success message
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      
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
                  <div className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center mb-3"
                       style={{ width: '60px', height: '60px' }}>
                    <i className="fas fa-user-plus fa-lg"></i>
                  </div>
                  <h2 className="fw-bold text-success mb-2">Create Account</h2>
                  <p className="text-muted">Join our chat community</p>
                </div>

                {error && (
                  <div className="alert alert-danger d-flex align-items-center mb-3" role="alert">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    <div>{error}</div>
                  </div>
                )}

                {success && (
                  <div className="alert alert-success d-flex align-items-center mb-3" role="alert">
                    <i className="fas fa-check-circle me-2"></i>
                    <div>{success}</div>
                  </div>
                )}

                <form onSubmit={handleRegister}>
                  <div className="mb-4">
                    <label htmlFor="username" className="form-label fw-semibold">
                      <i className="fas fa-user me-2 text-muted"></i>
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-control form-control-lg"
                      placeholder="Choose a username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                      disabled={isLoading}
                      minLength={3}
                    />
                    <div className="form-text">
                      <i className="fas fa-info-circle me-1"></i>
                      Username must be at least 3 characters long
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-success btn-lg w-100 mb-3"
                    disabled={isLoading || !username.trim() || username.length < 3}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-user-plus me-2"></i>
                        Create Account
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center">
                  <hr className="my-4" />
                  <p className="text-muted mb-0">
                    Already have an account?{' '}
                    <Link to="/login" className="text-success text-decoration-none fw-semibold">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits Card */}
            <div className="card mt-4 border-0 bg-transparent">
              <div className="card-body text-center">
                <h6 className="text-muted mb-3">Why join us?</h6>
                <div className="row">
                  <div className="col-4">
                    <i className="fas fa-users text-primary mb-2" style={{ fontSize: '1.5rem' }}></i>
                    <small className="text-muted d-block">Connect</small>
                  </div>
                  <div className="col-4">
                    <i className="fas fa-comment-dots text-info mb-2" style={{ fontSize: '1.5rem' }}></i>
                    <small className="text-muted d-block">Chat</small>
                  </div>
                  <div className="col-4">
                    <i className="fas fa-heart text-danger mb-2" style={{ fontSize: '1.5rem' }}></i>
                    <small className="text-muted d-block">Enjoy</small>
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

export default Register;