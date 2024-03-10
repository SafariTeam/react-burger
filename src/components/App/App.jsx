import React, { useEffect } from 'react';
import AppHeader from '../AppHeader';
import BurgerIngredients from '../BurgerIngredients';
import './App.module.css';
import BurgerConstructor from '../BurgerConstructor';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../services/actions/ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const isLoading = useSelector(state => state.ingredients.itemsRequest);
  const isFailed = useSelector(state => state.itemsFailed);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  },[dispatch]);

  return (
    <div className="App">
      <AppHeader/>
      {!isLoading && !isFailed && 
      <main>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </DndProvider>
      </main>}
    </div>
  );
}

export default App;