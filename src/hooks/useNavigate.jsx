import { useContext } from 'react';
import { NavigationContext } from '@components/NavigationContext';

const useNavigate = () => {
    return useContext(NavigationContext);
};

export default useNavigate;
