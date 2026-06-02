import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_URL = `${import.meta.env.VITE_API_URL}/api/v1`;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const autoLogin = async () => {
            try {
                const res = await fetch(
                    `${API_URL}/auth/auto-login`,
                    {
                        method: "POST",
                        credentials: "include",
                    }
                );

                if (!res.ok) {
                    throw new Error("Auto login failed");
                }

                const result = await res.json();

                if (result.status !== "fail") {
                    setUser(result.user || result);
                }
            } catch (err) {
                console.log("Auto login failed:", err.message);
            } finally {
                setLoading(false);
            }
        };

        autoLogin();
    }, []);

    const signUser = async (formData) => {
        try {
            const res = await fetch(
                `${API_URL}/auth/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            }

            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    const logUser = async (formData) => {
        try {
            const res = await fetch(
                `${API_URL}/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                    credentials: "include",
                }
            );

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            }

            setUser(result.user || result);

            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    const logOutUser = async () => {
        try {
            const res = await fetch(
                `${API_URL}/auth/logout`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (!res.ok) {
                throw new Error("Logout failed");
            }

            setUser(null);

            navigate("/login", {
                replace: true,
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                signUser,
                logUser,
                logOutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};