/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';

import { useSelector } from 'react-redux';

import ReactLoading from 'react-loading';

export default function AppLoading() {
  const loadingIsShow = useSelector((state) => state.loading.isShow);

  return (
    <>
      {
        loadingIsShow && (
        <div
          style={{
            position: 'fixed',
            height: '100vh',
            width: '100vw',
            background: 'rgba(0, 0, 0, 0.8)',
            zIndex: 9999,
            top: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '200px' }}>
            <ReactLoading type="cylon" color="#fff" width="200px" height="200px" delay={2} />
          </div>
        </div>
        )
      }

    </>
  );
}
