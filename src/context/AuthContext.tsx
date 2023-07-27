import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({
    isAuthenticated: false,
});

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    const data = {
        isAuthenticated,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
