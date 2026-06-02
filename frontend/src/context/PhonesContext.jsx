import { createContext, useContext, useEffect, useState } from "react";

const PhonesContext = createContext();
export const usePhones = () => useContext(PhonesContext);

const API_URL = import.meta.env.VITE_API_URL + "/api";

export const PhonesProvider = ({children}) => {
    const [phones, setPhones] = useState([]);

    const getPhones = async () => {
        try {
            const res = await fetch(`${API_URL}/phones`);

            
            if (!res.ok) {
                throw new Error("Something went wrong!")
            };

            const result = await res.json();
            setPhones(result.data)
            console.log(result.data)
        } catch(err) {
            console.log(err);
        }
    };

    const deletePhone = async (id) => {
        try {
            const res = await fetch(`${API_URL}/phones/${id}`, {
                method: "DELETE",
                credentials: "include"
            });

            if (!res.ok) {
                const result = await res.json();
                throw new Error(result.message);
            };

            setPhones(prev => prev.filter(phone => phone._id !== id));
        } catch(err) {
            console.log(err);
        }
    };

    const addPhone = async (phoneData) => {
        try {
            const res = await fetch(`${API_URL}/phones`, {
                method: "POST",
                body: phoneData,
                credentials: "include"
            });

            const result = await res.json();

            if (!res.ok) {
                console.error(result);
                throw new Error(result.message || "Failed to add phone");
            }

            console.log("Created phone:", result);

            setPhones(prev => [...prev, result]);

        } catch (err) {
            console.error("Error adding phone:", err);
        }
    };

        const updatePhone = async (id, formData) => {
        try {
            const res = await fetch(`${API_URL}/phones/${id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            };

            setPhones(prev =>
                prev.map(phone =>
                    phone._id === result._id ? result : phone
                )
            );
        } catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getPhones();
    }, []);

    return (
        <PhonesContext.Provider value={{phones, deletePhone, updatePhone, addPhone}}>
            {children}
        </PhonesContext.Provider>
    )
}