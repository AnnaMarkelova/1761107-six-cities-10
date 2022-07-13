import MainScreen from '../../pages/main-screen/main-screen';
import { Hotel } from '../../types/hotel';
import { User } from '../../types/user';

type MainScreenProps = {
  currentCity: string;
  currentSort: string;
  hotels: Hotel[];
  favoritesHotelsCount: number;
  user: User;
}

function App({ currentCity, currentSort, hotels, favoritesHotelsCount, user }: MainScreenProps): JSX.Element {

  return (
    < MainScreen
      currentCity={currentCity}
      currentSort={currentSort}
      hotels={hotels}
      favoritesHotelsCount={favoritesHotelsCount}
      user={user}
    />
  );
}

export default App;
