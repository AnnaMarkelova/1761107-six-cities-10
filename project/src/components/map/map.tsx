import React, { AllHTMLAttributes, useEffect } from 'react';
import { useRef } from 'react';
import useMap from '../../hooks/useMap';
import { Hotel } from '../../types/hotel';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from './consts/markers';
import { useAppSelector } from '../../hooks';
import { Icon, Marker } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import { getHotelsByCity } from '../../utils/hotel-utils';


type MapProps = {
  selectedHotel: Hotel | undefined;
  style: AllHTMLAttributes<string>;
  isMainScreen?: boolean;
}

export const Map: React.FunctionComponent<MapProps> = ({ selectedHotel, style, isMainScreen = true }) => {

  const { city, hotels } = useAppSelector((state) => state);

  const selectedHotels = isMainScreen ? hotels : [...getHotelsByCity(city).slice(0,3), selectedHotel];

  const mapRef = useRef(null);
  const map = useMap(mapRef);

  const defaultCustomIcon = new Icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = new Icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      selectedHotels.forEach((hotel) => {
        const marker = new Marker({
          lat: hotel ? hotel.location.latitude : 0,
          lng: hotel ? hotel.location.longitude : 0
        });

        marker
          .setIcon(
            selectedHotel !== undefined && hotel?.id === selectedHotel.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, selectedHotel]);

  return (
    <div
      style={{ height: style.height, width: style.width, margin: '0 auto' }}
      ref={mapRef}
    >
    </div>
  );

};

