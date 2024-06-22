import { Navigate, Outlet } from "react-router-dom"
import { ProtectedRoutesType } from "../vite-env"

const ProtectedRoute = ({ children, admin, adminOnly, isAuthenticated, redirect = "/" }: ProtectedRoutesType) => {
    if (!isAuthenticated) {
        return <Navigate to={redirect} />
    }

    if (adminOnly && !admin) {
        return <Navigate to={redirect} />
    }

    return children ? children : <Outlet />

}

export default ProtectedRoute;