import React from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [cookies, setCookie] = useCookies(['access_token']);
  console.log(cookies.access_token);
  const navigate = useNavigate();

  const logout = () => {
    setCookie('access_token', '');
    window.localStorage.removeItem('userID');
    navigate('/auth');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/create-receipe" className="nav-link active">
                  CreateReceipe
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/saved-receipe" className="nav-link active">
                  SavedReceipe
                </Link>
              </li>
              {!cookies.access_token ? (
                <li className="nav-item">
                  <Link to="/auth" className="nav-link active">
                    Login/Register
                  </Link>
                </li>
              ) : (
                <button onClick={logout}>Logout</button>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
