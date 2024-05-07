import { TokenProvider } from '@components/TokenProvider';
import { NavigationProvider } from '@components/NavigationProvider';
import Router from '@router/index';
function App() {
    return (
        <TokenProvider>
            <NavigationProvider>
                <Router />
            </NavigationProvider>
        </TokenProvider>
    )
}

export default App;
