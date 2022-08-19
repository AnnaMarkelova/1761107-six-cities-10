import { Hotel } from '../types/hotel';
import { system, image, internet, name, datatype } from 'faker';
import { City } from '../types/city';
import { getRandomNumber } from './utills';
import { cities } from '../consts/cities';
import { Host } from '../types/host';
import { Location } from '../types/location';
import { Comment } from '../types/comment';
import { UserComment } from '../types/user-comment';


const makeFakeCity = (): City => cities[getRandomNumber(0, cities.length - 1)];
const fakeCity = makeFakeCity();

export const makeFakeHotel = (): Hotel => ({
  bedrooms: datatype.number(),
  city: fakeCity,
  description: name.title(),
  goods: new Array(3).fill(null).map(() => name.title()),
  host: makeFakeHost(),
  id: datatype.number(),
  images: new Array(3).fill(null).map(() => system.filePath()),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: makeFakeLocation(),
  maxAdults: datatype.number(),
  previewImage: system.filePath(),
  price: datatype.number(),
  rating: datatype.number(),
  title: name.title(),
  type: name.title(),
});


const makeFakeHost = (): Host => ({
  avatarUrl : image.imageUrl(),
  id : datatype.number(),
  isPro : datatype.boolean(),
  name : internet.userName(name.firstName(), name.lastName()),
});

const makeFakeLocation = (): Location => ({
  latitude : datatype.number(),
  longitude : datatype.number(),
  zoom : datatype.number(),
});

export const makeFakeComment = (): Comment => ({
  comment: name.title(),
  date: new Date().toString(),
  id: datatype.number(),
  rating: datatype.number(5),
  user: makeFakeUserComment(),
});

const makeFakeUserComment = (): UserComment => ({
  avatarUrl: image.imageUrl(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: name.lastName(),
});

