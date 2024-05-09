import React, { useEffect } from 'react';
import AppHeader from '../AppHeader';
import './App.module.css';
import { getItems } from '../../services/actions/ingredients';
import { FeedInfo, ForgotPassword, Ingredient, LoginPage, MainPage, NotFound, OrdersPage, ProfilePage, RegisterPage, ResetPassword } from '../../pages';
import ProtectedRoute from '../ProtectedRoute';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import IngredientDetails from '../IngredientDetails';
import { RequestUser } from '../../services/actions/profile';
import Feed from '../../pages/feed';
import { useSelector, useDispatch } from '../../services/store';
import FeedOrderDetailsModal from '../FeedOrderDetails/FeedOrderDetailsModal';
import FeedOrderDetailsModalUser from '../FeedOrderDetails/FeedOrderDetailsModaluser';
import FeedInfoUser from '../../pages/feedInfoUser';

function App() {
  const location = useLocation();
  const background = location.state?.previousLocation;
  const isLoading = useSelector(state => state.ingredients.itemsRequest);
  const isFailed = useSelector(state => state.ingredients.itemsFailed);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function displayModal(): void {
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
          <Route path='/login' element={<ProtectedRoute children={<LoginPage/>} authIsRequired={false}/>}/>
          <Route path='/forgot-password' element={<ProtectedRoute children={<ForgotPassword/>} authIsRequired={false}/>}/>
          <Route path='/reset-password' element={<ProtectedRoute children={<ResetPassword/>} authIsRequired={false}/>}/>
          <Route path='/profile' element={<ProtectedRoute children={<ProfilePage/>} authIsRequired={true}/>}/>
          <Route path='/profile/orders' element={<ProtectedRoute children={<OrdersPage/>} authIsRequired={true}/>}/>
          <Route path='/profile/orders/:id' element={<ProtectedRoute children={<FeedInfoUser/>} authIsRequired={true}/>}/>
          <Route path='/ingredients/:id' element={<Ingredient/>}/>
          <Route path='/feed/' element={<Feed/>}/>
          <Route path='/feed/:id' element={<FeedInfo/>}/>

          <Route path='*' element={<NotFound/>}/>
        </Routes>

        {background && (
          <Routes>
            <Route path='/ingredients/:id' element=
            {<Modal onClose={displayModal} title={"Детали ингридиента"}>
                <IngredientDetails/>
            </Modal>}/>
            <Route path='/feed/:id' element=
            {<Modal onClose={displayModal}>
                <FeedOrderDetailsModal/>
            </Modal>}/>
            <Route path='/profile/orders/:id' element=
            {<Modal onClose={displayModal}>
                <FeedOrderDetailsModalUser/>
            </Modal>}/>
          </Routes>
        )}
    </div>
  );
}

export default App;