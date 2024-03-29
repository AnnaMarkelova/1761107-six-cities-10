import React, { CSSProperties, useEffect } from 'react';
import { useRef } from 'react';
import useMap from '../../hooks/use-map';
import { Hotel } from '../../types/hotel';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from './consts/markers';
import { useAppSelector } from '../../hooks';
import { Icon, Marker } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import { getCity } from '../../services/store/slices/city-data/city-data-selectors';


type MapProps = {
  selectedHotel: Hotel | null;
  hotels: Hotel [];
  style: CSSProperties;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [20, 40],
});

export const Map: React.FunctionComponent<MapProps> = ({ selectedHotel, hotels, style}) => {

  const city = useAppSelector(getCity);

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      hotels.forEach((hotel) => {
        const marker = new Marker({
          lat: hotel ? hotel.location.latitude : 0,
          lng: hotel ? hotel.location.longitude : 0
        });

        marker
          .setIcon(
            selectedHotel !== null && hotel?.id === selectedHotel.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, selectedHotel, hotels]);

  return (
    <div
      style={{ height: style.height, width: style.width, margin: style.margin }}
      ref={mapRef}
      data-testid={'rootElementMap'}
    >
    </div>
  );

};

