import React from 'react';
import AppHeader from './components/AppHeader';
import BurgerIngredients from './components/BurgerIngredients';
import './App.css';
import BurgerConstructor from './components/BurgerConstructor';
import constructorData from './utils/data';
import data from './utils/data';

function App() {
  const [state, setState] = React.useState({
    ingredients: [],
    isLoading: false,
    hasError: false
  });

  React.useEffect(() => {
    try{
      const getProductData = async () => {
      setState({...state, isLoading: true, hasError: false});
      const res = await fetch('https://norma.nomoreparties.space/api/ingredients');
      const data = await res.json();
      setState({...state, ingredients: data.data, isLoading: false, hasError: data.success });
      }
      getProductData();
    }
    catch(e)
    {
      setState({...state, ingredients: data.data, isLoading: false, hasError: true });
    }
  },[]);
  
  return (
    <div className="App">
      <AppHeader/>
      <main>
        <BurgerIngredients ingredients={constructorData}/>
        {state.hasError && <BurgerConstructor items={state.ingredients}/>}
      </main>
    </div>
  );
}

export default App;