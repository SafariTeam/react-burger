import React from 'react';
import AppHeader from './components/AppHeader';
import BurgerIngredients from './components/BurgerIngredients';
import './App.css';
import BurgerConstructor from './components/BurgerConstructor';
import constructorData from './utils/data';
import {url} from './utils/appsettings';
import data from './utils/data';

const getProductData = async () => {
  const res = await fetch(url);
  if(!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }
  const data = await res.json();
  return data.data;
}

function App() {
  const [state, setState] = React.useState({
    ingredients: [],
    hasError: false
  });

  React.useEffect(() => {
    try{
      setState({...state, hasError: false});
      getProductData().then(data => setState({...state, ingredients: data}));
    }
    catch(e)
    {
      setState({...state, hasError: true });
    }
  },[]);
  
  return (
    <div className="App">
      <AppHeader/>
      <main>
      {!state.hasError && state.ingredients.length > 0 && <BurgerIngredients ingredients={state.ingredients}/>}
      <BurgerConstructor items={constructorData}/>
      </main>
    </div>
  );
}

export default App;