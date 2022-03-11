/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Loader.css';
import { css } from '@emotion/react';
import { PropagateLoader } from 'react-spinners';

const override = css`
  display: block;
  position: absolute;
  z-index: 10000000;
  margin-top: 23%;
  margin-left: 50%;
`;

function Loader() {
  const [color, setColor] = useState('white');
  const isLoading = useSelector((state) => state.loading.isLoading);
  return (
    <div>
      <div className={` ${isLoading ? 'sweeter-loading' : ''}`} />
      <div className="sweet-loading">
        {/* <button type="button" onClick={() => setLoading(!loading)}>
          Toggle Loader
        </button> */}

        <PropagateLoader
          color={color}
          loading={isLoading}
          css={override}
          size={15}
          speedMultiplier={2}
        />
      </div>
    </div>
  );
}

export default Loader;
