import { SortType } from '../consts/sort-type';
import { getHotelById, getHotelsByCity, sortHotels } from './hotel-utils';
import { makeFakeHotel } from './mock';

const hotels = [makeFakeHotel(), makeFakeHotel()];
const city = hotels[0].city;

describe('Function: getHotelsByCity', () => {
  it('should return Hotels by City', () => {
    expect(getHotelsByCity(hotels, city)).toEqual(hotels);
  });
});

describe('Function: getHotelById', () => {
  it('should return Hotel by Id', () => {
    expect(getHotelById(hotels, hotels[0].id)).toEqual(hotels[0]);
  });
});

describe('Function: sortHotels', () => {
  it('should return sorts hotels', () => {
    expect(sortHotels.find((item) => item.sortType === SortType.Popular)?.getSortHotels(hotels)).toEqual(hotels);
  });
});
