import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RequestUser } from "../../services/actions/profile";
import { FC, ReactElement, useEffect } from "react";
import { getCookie } from "../../utils/cookies";

type TProtectedRoute = {
    children: ReactElement;
    authIsRequired: boolean;
}

export const ProtectedRoute: FC<TProtectedRoute> = ( {children, authIsRequired} ) => {
    const { user, isError } = useSelector((state: any) => state.profile);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(RequestUser());
    },[dispatch]);
    
    if(getCookie('authToken') && !user)
        return null;

    if (authIsRequired)
        return !isError && user ? 
        (children) : (<Navigate to="/login" replace state={{ from: location }} />);
    else
        return !user ? children : <Navigate to="/" replace />;
}