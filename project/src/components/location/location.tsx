type LocationProps = {
  city: string;
  currentCity: string;
}

export default function Location({city, currentCity}: LocationProps): JSX.Element {
  return (
    <a className={`locations__item-link tabs__item ${currentCity === city ? 'tabs__item--active' : 'href="#"'}`}>
      <span>{city}</span>
    </a>
  );
}
