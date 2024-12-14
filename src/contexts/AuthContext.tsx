import { useQueryClient } from '@tanstack/react-query';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const handleToken = (newToken: string | null) => {
        setToken(newToken);

        if (newToken) {
            localStorage.setItem('authToken', newToken);
        } else {
            localStorage.removeItem('authToken');
        }
    };

    const logout = () => {
        handleToken(null),
            navigate('/'),
            queryClient.invalidateQueries({
                queryKey: ['profile'],
            });
        queryClient.invalidateQueries({
            queryKey: ['myRoomMate'],
        });
    };

    return (
        <AuthContext.Provider value={{ token, handleToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
