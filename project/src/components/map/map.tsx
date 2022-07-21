import React, { useEffect } from 'react';
import { useRef } from 'react';
import { Icon, Marker } from 'leaflet';
import useMap from '../../hooks/useMap';
import { City, Hotel } from '../../types/hotel';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../consts/markers';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  hotels: Hotel[];
  selectedHotel: Hotel | undefined;
}

export const Map: React.FunctionComponent<MapProps> = ({ city, hotels, selectedHotel }) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

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
      hotels.forEach((hotel) => {
        const marker = new Marker({
          lat: hotel.location.latitude,
          lng: hotel.location.longitude
        });

        marker
          .setIcon(
            selectedHotel !== undefined && hotel.id === selectedHotel.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, selectedHotel]);

  return (
    <div
      style={{ height: '810px', width: '525px', marginLeft: 'inherit', marginRight: 'auto' }}
      ref={mapRef}
    >
    </div>
  );

};

