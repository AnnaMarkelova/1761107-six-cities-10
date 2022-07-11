import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';

type MainScreenProps = {
  cardNumber: number;
  foundPlaces: number;
}

// function App({cardNumber, foundPlaces}: MainScreenProps): JSX.Element {

//   return (
//     < MainScreen
//       cardNumber={cardNumber}
//       foundPlaces={foundPlaces}
//     />
//   );
// }

function App(): JSX.Element {

  return (
    < FavoritesScreen />
  );
}

export default App;
