/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUser, login, signup } from '../../api service/ApiService';
import './SignupForm.css';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants/AppConstants';

function SignupForm() {
  const [allValues, setAllValues] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    emailValid: true,
    passwordValid: true,
    phoneNumberValid: true,
    isChecked: false,
  });
  const [timer, setTimer] = useState(null);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const passwordMatcher =
    /^(?=.*\d)(?=.*[!@#$%^&*_])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const emailMatcher =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValidPassword =
    allValues.password != null &&
    allValues.password.trim().length > 0 &&
    passwordMatcher.test(allValues.password);
  const isValidEmail =
    allValues.email != null &&
    allValues.email.trim().length > 0 &&
    emailMatcher.test(allValues.email);
  const isValidPhoneNumber =
    allValues.phoneNumber != null && allValues.phoneNumber.trim().length > 10;

  const fieldsFilled =
    allValues.password != null &&
    allValues.password.trim().length > 0 &&
    allValues.confirmPassword != null &&
    allValues.confirmPassword.trim().length > 0 &&
    allValues.email != null &&
    allValues.email.trim().length > 0 &&
    allValues.phoneNumber != null &&
    allValues.phoneNumber.trim().length > 0 &&
    allValues.isChecked;

  const changeHandler = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };
  const changeHandlerPassword = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      !isValidPassword
        ? setAllValues({ ...allValues, passwordValid: false })
        : {};
      console.log(isValidPassword);
    }, 1000);

    setTimer(newTimer);
  };

  function loginUser() {
    ACCESS_TOKEN ? localStorage.removeItem(ACCESS_TOKEN) : {};
    REFRESH_TOKEN ? localStorage.removeItem(REFRESH_TOKEN) : {};

    login({ email: allValues.email, password: allValues.password })
      .then((response) => {
        // console.log(response.data);
        const token = response.data.access_token;
        const refreshToken = response.data.refresh_token;
        localStorage.setItem(ACCESS_TOKEN, token);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        // eslint-disable-next-line no-unused-expressions
      });
  }

  function getCurrentUser() {
    loginUser();
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidPassword) {
      setAllValues({ ...allValues, passwordValid: false });
      return;
    }

    if (!isValidEmail) {
      setAllValues({ ...allValues, emailValid: false });
      return;
    }

    if (!isValidPhoneNumber) {
      setAllValues({ ...allValues, phoneNumberValid: false });
      return;
    }

    dispatch({ type: 'SET_LOADER', payload: true });
    const signupRequest = {
      email: allValues.email,
      phoneNumber: allValues.phoneNumber,
      password: allValues.password,
      confirmPassword: allValues.confirmPassword,
    };
    signup(signupRequest)
      .then((response) => {
        console.log(response.data);

        getCurrentUser();
        dispatch({ type: 'SET_LOADER', payload: false });
        navigate('/otp');
      })
      .catch((error) => {
        dispatch({ type: 'SET_LOADER', payload: false });
        error.response
          ? toast.error(`${error.response.data.message}`)
          : toast.error(`${error.message}, please try again`);
        // eslint-disable-next-line no-unused-expressions
      });
  };

  const handleClickShowPassword = () => {
    setAllValues({ ...allValues, showPassword: !allValues.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <ToastContainer />
      <div className="signup-to-your-acc">Lets get started</div>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          {...(!allValues.emailValid ? { error: true } : {})}
          error={!allValues.emailValid}
          fluid
          label="Email address"
          id="form-input-first-name"
          type="email"
          name="email"
          value={allValues.email}
          onChange={changeHandler}
          onFocus={() =>
            setAllValues({
              ...allValues,
              emailValid: true,
            })
          }
        />
        <Form.Input
          {...(!allValues.phoneNumberValid ? { error: true } : {})}
          fluid
          label="Phone number"
          id="form-input-phone-number"
          type="number"
          name="phoneNumber"
          value={allValues.phoneNumber}
          onChange={changeHandler}
          onFocus={() => setAllValues({ ...allValues, phoneNumberValid: true })}
        />
        <div className="signup-form-password-field">
          <Form.Input
            type={allValues.showPassword ? 'text' : 'password'}
            {...(!allValues.passwordValid ? { error: true } : {})}
            className="signup-form-input"
            //   error="Please enter your last name"
            fluid
            label="Password"
            name="password"
            value={allValues.password}
            onChange={changeHandler}
            onFocus={() => setAllValues({ ...allValues, passwordValid: true })}
          />
          <div className="signup-label">
            <div
              className="signup-label-icon"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {allValues.showPassword ? 'hide' : 'show'}
            </div>
          </div>
        </div>
        <Form.Input
          type="password"
          {...(allValues.password !== allValues.confirmPassword
            ? { error: true }
            : {})}
          className="signup-form-input"
          //   error="Please enter your last name"
          fluid
          label="Re-enter password"
          name="confirmPassword"
          value={allValues.confirmPassword}
          onChange={changeHandler}
        />
        <Form.Checkbox
          label="I agree to the Terms and Conditions"
          defaultChecked={allValues.isChecked}
          onClick={() =>
            setAllValues({ ...allValues, isChecked: !allValues.isChecked })
          }
          // error={{
          //   content: 'You must agree to the terms and conditions',
          //   pointing: 'left',
          // }}
        />
        <div className="signup-form-submit-btn">
          <Button
            {...(fieldsFilled ? { color: 'violet' } : { disabled: true })}
            type="submit"
            fluid
            // onClick={handleLoading}
            // loading={isLoading}
          >
            Create account
          </Button>
        </div>
      </Form>
      <div className="signup-bottom-text">
        <div className="signup-bottom-text-one">
          Already have an account? &nbsp;
          <Link className="signup-create-an-acct" href to="/">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
