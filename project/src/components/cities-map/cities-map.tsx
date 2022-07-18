import React from 'react';

type CitiesMapProps = {
  hotelsCount: number;
}

export const CitiesMap: React.FunctionComponent<CitiesMapProps> = ({ hotelsCount }) => (
  <div className="cities__right-section">
    {hotelsCount && <section className="cities__map map"></section>}
  </div>
);

