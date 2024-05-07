import PropTypes from 'prop-types';
import { useState, useEffect, createContext } from 'react';
import { parseToken } from '@components/tokenUtils';

export const TokenContext = createContext({ token: '', useToken: () => {} });

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(
        localStorage.getItem('access_token') || null
    );

    useEffect(() => {
        if (token) {
            localStorage.setItem('access_token', token);
        }
    }, [token]);

    const isLoggedIn = !!token;

    const getRawToken = () => {
        return parseToken(token);
    };

    return (
        <TokenContext.Provider value={{ token, setToken, isLoggedIn, getRawToken }}>
            {children}
        </TokenContext.Provider>
    );
};

TokenProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
