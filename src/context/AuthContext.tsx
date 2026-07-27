import { createContext, useState, useContext, useEffect, type ReactNode } from "react";
import api from "../lib/api";

interface User {
    id: string;
    email: string;
    username: string;
    role: string;
}

interface ContextType {
    user: User | null;
    token: string | null;
    login: (newToken: string) => void;
    logout: () => void;
    loading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<ContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!token && !!user;

    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            api.get('/auth/me')
                .then((response) => setUser(response.data.user))
                .catch(() => logout())
                .finally(() => setLoading(false));
        } else {
            delete api.defaults.headers.common['Authorization'];
            setLoading(false);
        }
    }, [token]);
    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
