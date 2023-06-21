import { useLocation, Navigate, Outlet } from "react-router";
import useAuth from "./useAuth";

const RequireAuth = () => {
    const { Auth } = useAuth();
    const Location = useLocation();
    const token = localStorage.getItem('token')

    return (
        Auth?.token || token /* && auth?.acl?.role_type === "admin" */ ?
            <Outlet />
            : <Navigate to="/login" state={{ from: Location }} replace />
    )
}

export default RequireAuth;