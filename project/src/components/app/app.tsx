//import LoginScreen from '../../pages/login-screen/login-screen';
import MainScreen from '../../pages/main-screen/main-screen';
//import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
//import { getComments } from '../../mock/comments';
//import PropertyScreen from '../../pages/property-screen/property-screen';
import { Hotel } from '../../types/hotel';
import { User } from '../../types/user';

type MainScreenProps = {
  currentCity: string;
  currentSort: string;
  hotels: Hotel[];
  favoritesHotels: Hotel[];
  user: User;
}

function App({ currentCity, currentSort, hotels, favoritesHotels, user }: MainScreenProps): JSX.Element {

  return (
    < MainScreen
      currentCity={currentCity}
      currentSort={currentSort}
      hotels={hotels}
      favoritesHotelsCount={favoritesHotels.length}
      user={user}
    />
  );
}


// page LoginScreen
// type ScreenProps = {
//   currentCity: string;
//   currentSort: string;
//   hotels: Hotel[];
//   favoritesHotelsCount: number;
//   user: User;
// }

// function App({ currentCity, currentSort, hotels, favoritesHotelsCount, user }: ScreenProps): JSX.Element {

//   return (
//     < LoginScreen
//       favoritesHotelsCount={favoritesHotelsCount}
//     />
//   );
// }

// // page FavoritesScreen
// type ScreenProps = {
//   currentCity: string;
//   currentSort: string;
//   hotels: Hotel[];
//   favoritesHotels: Hotel[];
//   user: User;
// }

// function App({ currentCity, currentSort, hotels, favoritesHotels, user }: ScreenProps): JSX.Element {

//   return (
//     < FavoritesScreen
//       favoritesHotels={favoritesHotels}
//       user={user}
//     />
//   );
// }

// page FavoritesScreen
// type ScreenProps = {
//   currentCity: string;
//   currentSort: string;
//   hotels: Hotel[];
//   favoritesHotels: Hotel[];
//   user: User;
// }

// function App({ currentCity, currentSort, hotels, favoritesHotels, user }: ScreenProps): JSX.Element {
//   return (
//     < PropertyScreen
//       hotel={hotels[0]}
//       user={user}
//       comments={getComments()}
//       favoritesHotelsCount={favoritesHotels.length}
//       nearHotels={[hotels[1], hotels[2], hotels[3]]}
//     />
//   );
// }

export default App;
