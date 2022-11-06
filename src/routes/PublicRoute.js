import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { authContext } from '../component/authentication/AuthContext';



export default function PublicRoute({ children }) {
    const { user, isLoading } = useContext(authContext);
    if (isLoading) {
        return <div className="text-2xl text-center">Loading.......</div>;
    }

    return user?.uid ? <Navigate to="/" /> : children;
}