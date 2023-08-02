import { useEffect, createContext } from 'react';
import { useFetch } from '../../hooks/useFetch';

// Define UserContext here before using it in UserProvider
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const userFetch = useFetch();

    useEffect(() => {
        userFetch.makeRequest('/user/').then(async (response) => {
            const [user] = response || [];
            if (user?.is_employer) {
                const [company] = (
                    await userFetch.makeRequest('/companies/', undefined, true)
                ) || [];
                if (company) {
                    userFetch.setData(prev => (
                        prev && [{ ...prev[0], companyData: company }]
                    ));
                }
            }
        });
    }, []);

    return (
        <UserContext.Provider value={userFetch.data?.[0] || null}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext };

