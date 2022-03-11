/* eslint-disable no-unused-expressions */
/* eslint-disable semi */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable padded-blocks */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, login } from '../../api service/ApiService';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants/AppConstants';

// import { useForm } from 'react-hook-form';
/* eslint-disable react/jsx-props-no-spreading, prefer-const */
/* eslint-disable no-unused-vars, operator-linebreak, no-trailing-spaces, no-multiple-empty-lines */

const notify = (msg) => toast.error(msg);

function LoginForm(props) {
  const onSignup = (event) => {};
  //   const { setLoader } = props;

  let [color, setColor] = useState('orange');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();

  const fieldsFilled =
    password != null &&
    password.trim().length > 0 &&
    email != null &&
    email.trim().length > 0;

  function getCurrentUser() {
    getUser()
      .then((response) => {
        if (response.data) {
          dispatch({ type: 'SET_CURRENT_USER', payload: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

      const loginRequest = { email, password };

      dispatch({ type: 'SET_LOADER', payload: true });
      ACCESS_TOKEN ? localStorage.removeItem(ACCESS_TOKEN) : {};
      REFRESH_TOKEN ? localStorage.removeItem(REFRESH_TOKEN) : {};
      login(loginRequest)
        .then((response) => {
          console.log(response.message);
          const token = response.data.access_token;
          const refreshToken = response.data.refresh_token;
          localStorage.setItem(ACCESS_TOKEN, token);
          localStorage.setItem(REFRESH_TOKEN, refreshToken);
          dispatch({ type: 'SET_LOADER', payload: false });
          navigate('/dashboard');
        })
        .catch((error) => {
          dispatch({ type: 'SET_LOADER', payload: false });
          error.response
            ? toast.error(`${error.response.data.details[0]}`)
            : toast.error(`${error.message}, please try again`)
          console.log(error.message);
          // eslint-disable-next-line no-unused-expressions
        });
    getCurrentUser();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <ToastContainer />
      <div className="login-to-your-acc">Log in to your account</div>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          fluid
          label="Email address"
          id="form-input-first-name"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="login-form-password-field">
          <Form.Input
            type={showPassword ? 'text' : 'password'}
            className="form-input"
            //   error="Please enter your last name"
            fluid
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="label">
            <div
              className="label-icon"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? 'hide' : 'show'}
            </div>
          </div>
        </div>
        <div className="login-form-submit-btn">
          <Button
            {...(fieldsFilled ? { color: 'violet' } : { disabled: true })}
            type="submit"
            fluid
          >
            Log in
          </Button>
        </div>
      </Form>
      <div className="bottom-text">
        <div className="bottom-text-one">
          Don’t have an account? &nbsp;
          <Link className="create-an-acct" href to="/create-account">
            Create account
          </Link>
        </div>
        <div className="bottom-text-two">
          <Link href to="/forgot-password">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
