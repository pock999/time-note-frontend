/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';

import { useSelector } from 'react-redux';

import { Box, LinearProgress } from '@mui/material';

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
          <Box sx={{ width: '200px' }}>
            <LinearProgress />
          </Box>
        </div>
        )
      }

    </>
  );
}
