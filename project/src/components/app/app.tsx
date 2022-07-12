import MainScreen from '../../pages/main-screen/main-screen';
import { Hotel } from '../../types/hotel';

type MainScreenProps = {
  currentCity: string;
  currentSort: string;
  hotels: Hotel[];
  favoritesHotelsCount: number;
}

function App({ currentCity, currentSort, hotels, favoritesHotelsCount }: MainScreenProps): JSX.Element {

  return (
    < MainScreen
      currentCity={currentCity}
      currentSort={currentSort}
      hotels={hotels}
      favoritesHotelsCount={favoritesHotelsCount}
    />
  );
}

export default App;
