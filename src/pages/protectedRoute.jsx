import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

export default function ProtectedRoute({ children, user }) {
    const location = useLocation();

    return user ? 
    (children) 
    : 
    (<Navigate to="/login" replace state={{ from: location.pathname }} />);
}

ProtectedRoute.prototype = {
    children: PropTypes.node.isRequired,
    user: PropTypes.shape({email: PropTypes.string, password: PropTypes.string})
}