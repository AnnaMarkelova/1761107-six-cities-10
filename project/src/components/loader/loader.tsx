import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

export const LoaderThreeDots: React.FunctionComponent = () => (
  <div className="loader" style={{
    position: 'fixed',
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1001,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}
  >
    <ThreeDots color="#00BFFF" height={80} width={80} />
  </div>
);
