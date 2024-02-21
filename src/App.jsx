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
    const url = 'https://norma.nomoreparties.space/api/ingredients';
    
    const getProductData = async () => {
      setState({...state, isLoading: true, hasError: false});
      const res = await fetch(url);
      const data = await res.json();
      setState({...state, ingredients: data.data, isLoading: false, hasError: data.success });
      }
    try{
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
      {state.hasError && <BurgerIngredients ingredients={state.ingredients}/>}
      <BurgerConstructor items={constructorData}/>
      </main>
    </div>
  );
}

export default App;