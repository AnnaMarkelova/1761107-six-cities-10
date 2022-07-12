import PlaceCard from '../../components/place-card/place-card';
import Location from '../../components/location/location';
import { Hotel } from '../../types/hotel';
import { cities, sortType } from '../../const/const';
import Header from '../../components/header/header';

type MainScreenProps = {
  currentCity: string;
  currentSort: string;
  hotels: Hotel[];
  favoritesHotelsCount: number;
}

export default function MainScreen({ currentCity, currentSort, hotels, favoritesHotelsCount }: MainScreenProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header
        favoriteHotelsCount={favoritesHotelsCount}
        userName={'Oliver.conner@gmail.com'}
        hasLoginBlock
        hasAuthorization
      />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {cities.map((item) => (
                <li className="locations__item" key={item}>
                  <Location
                    city={item}
                    currentCity={currentCity}
                  />
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{hotels.length} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  {Object.keys(sortType).map((item) =>
                    (<li className={`places__option ${currentSort === sortType[item] ? 'places__option--active' : ''}`} tabIndex={0} key={item}>{sortType[item]}</li>)
                  )}
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                {hotels.map((item) => (
                  <PlaceCard
                    key={item.id}
                    hotel={item}
                  />))}
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
