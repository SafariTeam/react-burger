import React, { useEffect } from 'react';
import AppHeader from '../AppHeader';
import './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../services/actions/ingredients';
import { ForgotPassword, Ingredient, LoginPage, MainPage, NotFound, ProfilePage, ProtectedRoute, RegisterPage, ResetPassword } from '../../pages';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import IngredientDetails from '../IngredientDetails';
import { useModal } from '../../services/hooks/useModal';
import { RequestUser } from '../../services/actions/profile';

function App() {
  const location = useLocation();
  const background = location.state?.previousLocation;
  const isLoading = useSelector(state => state.ingredients.itemsRequest);
  const { user } = useSelector(state => state.profile);
  const isFailed = useSelector(state => state.itemsFailed);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  function displayModal() {
    navigate(-1);
  }

  useEffect(() => {
    dispatch(getItems());
    dispatch(RequestUser());
  },[dispatch]);

  return (
    <div className="App">
        <AppHeader/>
        <Routes location={background || location}>
          {!isLoading && !isFailed && 
          <Route path='/' index element={<MainPage/>}/>}
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          <Route path='/profile' element={<ProtectedRoute children={<ProfilePage/>} user={user}/>}/>
          <Route path='/ingredients/:id' element={<Ingredient/>}/>

          <Route path='*' element={<NotFound/>}/>
        </Routes>

        {background && (
          <Routes>
            <Route path='/ingredients/:id' element=
            {<Modal onClose={displayModal} title={"Детали ингридиента"}>
                <IngredientDetails/>
            </Modal>}/>
          </Routes>
        )}
    </div>
  );
}

export default App;