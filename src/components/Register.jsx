import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { ref, push } from 'firebase/database';

function Register({ users, setUsers }) {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    if (users.includes(username)) {
      setError('User already exists!');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Add to local state
      setUsers([...users, username]);

      // Add to Firebase
      const usersRef = ref(db, 'users');
      await push(usersRef, username);

      // Show success and navigate
      setIsLoading(false);
      navigate('/login', { 
        state: { 
          message: 'Registration successful! Please log in.',
          username: username 
        } 
      });
    } catch (err) {
      setError('Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h3 className="mb-0">
                <i className="fas fa-user-plus me-2"></i>
                Create Account
              </h3>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    <i className="fas fa-user me-2"></i>
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError(''); // Clear error when user types
                    }}
                    placeholder="Enter your username"
                    required
                    disabled={isLoading}
                  />
                  {error && (
                    <div className="invalid-feedback">
                      {error}
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100 mb-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-user-plus me-2"></i>
                      Register
                    </>
                  )}
                </button>

                <div className="text-center">
                  <p className="text-muted mb-0">
                    Already have an account?
                  </p>
                  <button
                    type="button"
                    className="btn btn-link p-0"
                    onClick={() => navigate('/login')}
                  >
                    Sign in here
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="text-center mt-3">
            <small className="text-muted">
              <i className="fas fa-shield-alt me-1"></i>
              Your account will be created securely
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;