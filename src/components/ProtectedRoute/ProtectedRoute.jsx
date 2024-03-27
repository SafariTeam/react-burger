import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { RequestUser } from "../../services/actions/profile";
import { useEffect } from "react";

export default function ProtectedRoute({ children, authIsRequired }) {
    const { user, authorized, isError } = useSelector(state => state.profile);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(RequestUser());
    },[dispatch]);

    if(!authorized && !user)
        return null;

    if (authIsRequired)
        return !isError && user ? 
        (children) : (<Navigate to="/login" replace state={{ from: location }} />);
    else
        return !user ? children : <Navigate to="/" replace />;
}

ProtectedRoute.prototype = {
    children: PropTypes.node.isRequired,
    authIsRequired: PropTypes.bool
}