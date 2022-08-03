import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

export const LoaderThreeDots: React.FunctionComponent = () => (
  <div className="loader">
    <ThreeDots color="#00BFFF" height={80} width={80} />
  </div>
);
