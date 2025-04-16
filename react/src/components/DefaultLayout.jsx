import React, { useEffect } from "react";
import { data, Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

const handleModuleClick = (modulePath) => {
    setSelectedModule(modulePath);
};

const toggleYear = (year) => {
    setExpandedYear(expandedYear === year ? null : year);
};

const toggleSemester = (semester) => {
    setExpandedSemester(expandedSemester === semester ? null : semester);
};

function DefaultLayout() {
    const { notification, user, token, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to="/auth/login" />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <nav className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <img
                                    className="h-8 w-auto"
                                    src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
                                    alt="Logo École"
                                />
                                <span className="ml-2 text-xl font-bold text-gray-800">
                                    Gestion des Notes
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="ml-3 relative">
                                <div className="flex items-center">
                                    <span className="text-gray-700 mr-4">
                                        Bienvenue, {user.name}
                                    </span>
                                    <button
                                        onClick={onLogout}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                    >
                                        Déconnexion
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    );
}

export default DefaultLayout;
