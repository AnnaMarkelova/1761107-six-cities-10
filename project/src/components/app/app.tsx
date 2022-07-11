import MainScreen from '../../pages/main-screen/main-screen';

type MainScreenProps = {
  cardNumber: number;
  foundPlaces: number;
}

function App({cardNumber, foundPlaces}: MainScreenProps): JSX.Element {

  return (
    < MainScreen
      cardNumber={cardNumber}
      foundPlaces={foundPlaces}
    />
  );
}

export default App;
