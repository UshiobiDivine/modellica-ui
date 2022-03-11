import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import './SignupPage.css';
import SidebarOne from '../../components/sidebar/SidebarOne';
import SignupForm from '../../components/signup/SignupForm';

function SignupPage() {
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
      <div className="signup-container">
        <div className="signup-sidebar side-bar-hidden">
          <SidebarOne />
        </div>
        <div className="signup-main">
          <div className="signup-main-loginform">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
