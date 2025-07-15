import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5 text-center">
                <div className="mb-4">
                  <i className="fas fa-comments text-primary mb-3" style={{ fontSize: '3rem' }}></i>
                  <h1 className="display-4 fw-bold text-primary mb-3">
                    Simple Chat
                  </h1>
                  <p className="lead text-muted mb-4">
                    A tiny React + Firebase chat app to learn React basics 🚀
                  </p>
                </div>

                <div className="d-grid gap-3 d-md-flex justify-content-md-center">
                  <Link 
                    to="/register" 
                    className="btn btn-primary btn-lg px-4 py-2 rounded-pill shadow-sm"
                  >
                    <i className="fas fa-user-plus me-2"></i>
                    Get Started
                  </Link>
                  <Link 
                    to="/login" 
                    className="btn btn-outline-primary btn-lg px-4 py-2 rounded-pill"
                  >
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Sign In
                  </Link>
                </div>

                <div className="mt-5 pt-4 border-top">
                  <div className="row text-center">
                    <div className="col-4">
                      <i className="fas fa-bolt text-warning mb-2" style={{ fontSize: '1.5rem' }}></i>
                      <h6 className="text-muted">Fast</h6>
                    </div>
                    <div className="col-4">
                      <i className="fas fa-shield-alt text-success mb-2" style={{ fontSize: '1.5rem' }}></i>
                      <h6 className="text-muted">Secure</h6>
                    </div>
                    <div className="col-4">
                      <i className="fas fa-mobile-alt text-info mb-2" style={{ fontSize: '1.5rem' }}></i>
                      <h6 className="text-muted">Mobile</h6>
                    </div>
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

export default Home;