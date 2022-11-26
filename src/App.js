import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import UserProvider from 'contexts/user.jsx';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

// analytics imports
import { Analytics } from '@vercel/analytics/react';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <UserProvider>
                    <CssBaseline />
                    <NavigationScroll>
                        <Routes />
                        <Analytics />
                    </NavigationScroll>
                </UserProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
