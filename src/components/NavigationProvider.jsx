import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { NavigationContext } from './NavigationContext';

export const NavigationProvider = ({ children }) => {
    const [page, setPage] = useState(window.location.pathname);

    useEffect(() => {
        const handlePopstate = () => {
            setPage(window.location.pathname);
        };
        window.addEventListener('popstate', handlePopstate);
        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, []);

    const navigate = (url) => {
        setPage(url);
        window.history.pushState(null, '', url);
    };

    return (
        <NavigationContext.Provider value={{ page, navigate }}>
            {children}
        </NavigationContext.Provider>
    );
};

NavigationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
