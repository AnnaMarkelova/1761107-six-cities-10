import MainScreen from '../../pages/main-screen/main-screen';
import { Hotel } from '../../types/hotel';

type MainScreenProps = {
  currentCity: string;
  currentSort: string;
  hotels: Hotel[];
}

function App({ currentCity, currentSort, hotels }: MainScreenProps): JSX.Element {

  return (
    < MainScreen
      currentCity={currentCity}
      currentSort={currentSort}
      hotels={hotels}
    />
  );
}

export default App;
