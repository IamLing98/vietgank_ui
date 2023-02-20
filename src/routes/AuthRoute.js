import { constant } from 'lodash';
import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import constants from 'utils/constants';
const AuthContext = createContext();

export const useLocalStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            if (value) {
                return JSON.parse(value);
            } else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });
    const setValue = (newValue) => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) {}
        setStoredValue(newValue);
    };
    return [storedValue, setValue];
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useLocalStorage(constants.AUTH.VIETGANGZ_TOKEN, null);
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    const login = async (data) => {
        setUser(data);
        navigate('/profile');
    };

    // call this function to sign out logged in user
    const logout = () => {
        setToken(null);
        navigate('/', { replace: true });
    };

    const value = useMemo(
        () => ({
            token,
            login,
            logout
        }),
        [token]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
