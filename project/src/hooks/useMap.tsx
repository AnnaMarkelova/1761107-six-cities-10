import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Map, TileLayer } from 'leaflet';
import { City } from '../types/city';

export default function useMap( mapRef: MutableRefObject<HTMLElement | null>, city: City): Map | null {

  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: 0,
          lng: 0,
        },
        zoom: 1
      });
      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef]);

  useEffect(() => {
    if (map === null) {
      return;
    }

    const currentCenter = map.getCenter();
    if (currentCenter.lat === city.location.latitude && currentCenter.lng === city.location.longitude) {
      return;
    }

    map.eachLayer((layer) => map.removeLayer(layer));
    map.flyTo(
      {
        lat: city.location.latitude,
        lng: city.location.longitude,
      },
      city.location.zoom
    );

    const layer = new TileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }
    );

    map.addLayer(layer);
    setMap(map);
  }, [map, city]);

  return map;
}


