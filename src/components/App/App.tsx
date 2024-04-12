import React, { useEffect } from 'react';
import AppHeader from '../AppHeader';
import './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../services/actions/ingredients';
import { ForgotPassword, Ingredient, LoginPage, MainPage, NotFound, ProfilePage, RegisterPage, ResetPassword } from '../../pages';
import ProtectedRoute from '../ProtectedRoute';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import IngredientDetails from '../IngredientDetails';
import { RequestUser } from '../../services/actions/profile';

function App() {
  const location = useLocation();
  const background = location.state?.previousLocation;
  const isLoading = useSelector((state: any) => state.ingredients.itemsRequest);
  const isFailed = useSelector((state: any) => state.itemsFailed);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function displayModal(): void {
    navigate(-1);
  }

  useEffect(() => {
    // @ts-ignore
    dispatch(getItems());
    // @ts-ignore
    dispatch(RequestUser());
  },[dispatch]);

  return (
    <div className="App">
        <AppHeader/>
        <Routes location={background || location}>
          {!isLoading && !isFailed && 
          <Route path='/' index element={<MainPage/>}/>}
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<ProtectedRoute children={<LoginPage/>} authIsRequired={false}/>}/>
          <Route path='/forgot-password' element={<ProtectedRoute children={<ForgotPassword/>} authIsRequired={false}/>}/>
          <Route path='/reset-password' element={<ProtectedRoute children={<ResetPassword/>} authIsRequired={false}/>}/>
          <Route path='/profile' element={<ProtectedRoute children={<ProfilePage/>} authIsRequired={true}/>}/>
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