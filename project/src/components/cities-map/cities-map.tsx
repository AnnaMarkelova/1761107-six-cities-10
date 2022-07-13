type CitiesMapProps = {
  hotelsCount: number;
}

export default function CitiesMap({hotelsCount}: CitiesMapProps): JSX.Element {
  return (
    <div className="cities__right-section">
      {hotelsCount ? <section className="cities__map map"></section> : ''}
    </div>
  );
}
