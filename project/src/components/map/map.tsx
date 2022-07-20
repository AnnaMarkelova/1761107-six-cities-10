import React from 'react';
import { useRef } from 'react';
import useMap from '../../hooks/useMap';
import { City } from '../../types/hotel';

type MapProps = {
  city: City;
}

export const Map: React.FunctionComponent<MapProps> = ({ city }) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  return (
    <div
      style={{height: '500px'}}
      ref={mapRef}
    >
    </div>
  );

};

