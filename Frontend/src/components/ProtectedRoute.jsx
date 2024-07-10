import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (accessToken && refreshToken) {
        return <Component />;
    } else {
        return <Navigate to="/" />;
    }
};

export default ProtectedRoute;
