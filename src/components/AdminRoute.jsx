import { Navigate } from "react-router-dom";

export default function AdminRoute({
                                       children
                                   }) {

    const token =
        sessionStorage.getItem("token");

    const role =
        sessionStorage.getItem("role");

    if (!token) {

        return <Navigate to="/login" />;

    }

    if (role !== "admin") {

        return <Navigate to="/" />;

    }

    return children;

}