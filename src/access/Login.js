import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import api from '../api/Server';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [status, setStatus] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handlerLogin = (e) => {
    e.preventDefault();
    api
      .post('/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.message) {
          setStatus(res.data.message);
        } else {
          setRedirect(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {redirect && <Redirect to="/" />}
      <div class="login d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
        <div class="box">
          <form onSubmit={handlerLogin}>
            {status && (
              <div class="alert alert-primary d-flex align-items-center" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <div>{status}</div>
              </div>
            )}
            <div class="mb-3">
              <label for="email" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div id="emailHelp" class="form-text">
              No have account? <Link to="/register">Register</Link>
            </div>
            <button type="submit" class="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
