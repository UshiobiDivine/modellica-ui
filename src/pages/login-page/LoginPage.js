/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from '../../components/login-form/LoginForm';
import SidebarOne from '../../components/sidebar/SidebarOne';
import './LoginPage.css';
import Loader from '../../components/loader/Loader';

// const notify = () => toast.success('Wow so easy!');

function LoginPage(props) {
  const isLoading = useSelector((state) => state.loading.isLoading);

  return (
    <div>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        ''
      )}
      <div className="login-container">
        <div className="login-sidebar side-bar-hidden">
          <SidebarOne />
        </div>
        <div className="login-main">
          <div className="login-main-loginform">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
