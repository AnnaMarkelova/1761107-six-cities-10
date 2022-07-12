import FavoritePlaceCard from '../favorite-place-card/favorite-place-card';

type FavoritesLocationProps = {
  cardNumber: number
}

export default function FavoriteLocation({cardNumber}: FavoritesLocationProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>Amsterdam</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {new Array(cardNumber).fill(<FavoritePlaceCard />)}
      </div>
    </li>
  );
}
