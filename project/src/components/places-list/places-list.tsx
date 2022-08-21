import React from 'react';
import { cityCardType } from '../../consts/city-card-type';
import { useAppSelector } from '../../hooks';
import { SelectHotelsByCity } from '../../services/selectors/get-hotels';
import { sortHotels } from '../../utils/hotel-utils';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  onListItemHover: (id: number | undefined) => void;
  sort: string;
}

const PlacesList: React.FunctionComponent<PlacesListProps> = ({ onListItemHover, sort }) => {

  const hotelsByCity = useAppSelector(SelectHotelsByCity);

  const currentHotels = sortHotels.find((item) => item.sortType === sort)?.getSortHotels(hotelsByCity);

  return (
    <div className="cities__places-list places__list tabs__content" data-testid={'rootElementPlacesList'}>
      {currentHotels?.map((item) => (
        <PlaceCard
          key={item.id}
          hotel={item}
          cardType={cityCardType.CITIES_CARD}
          onListItemHover={onListItemHover}
        />))}
    </div>
  );
};

export default React.memo(PlacesList);
