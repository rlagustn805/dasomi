import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    token: string | null;
    handleToken: (token: string | null) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
); // undefined로 기본 값 설정하면 Provider로 감싸지 않았을 때 명확한 에러 제시

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('authToken')
    );

    const handleToken = (newToken: string | null) => {
        setToken(newToken);

        if (newToken) {
            localStorage.setItem('authToken', newToken);
        } else {
            localStorage.removeItem('authToken');
        }
    };

    const logout = () => handleToken(null);

    return (
        <AuthContext.Provider value={{ token, handleToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
