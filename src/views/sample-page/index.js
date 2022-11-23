import { useContext, useEffect, useState } from 'react';
// material-ui
import { Typography, Box } from '@mui/material';
import { Grid } from '@mui/material';
import LoginCard from 'views/dashboard/Default/LoginCard';
import DescCard from './DescCard';
import WishCard from './WishCard';
import { gridSpacing } from 'store/constant';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { AuthStateContext, AuthDispatchContext } from 'contexts/user';

const SamplePage = () => {
    const [isLoading, setLoading] = useState(true);
    const { first_name, recipient } = useContext(AuthStateContext);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <MainCard sx={{ height: 187 }}>
                            <Grid container direction="column" alignItems="center" justifyContent="space-between" sx={{ pt: 5, px: 5 }}>
                                <Typography variant="h3">Hello,</Typography>
                                <Typography variant="h1">{first_name}!</Typography>
                            </Grid>
                        </MainCard>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <MainCard title="Your monito/monita is..." sx={{ backgroundColor: '#ffb1ab', height: 187 }}>
                            <Typography variant="h2">{recipient}</Typography>
                        </MainCard>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <DescCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={6}>
                                <MainCard title="Your Monito/Monita's Wishlist (if any)" sx={{ backgroundColor: '#aedef0' }}>
                                    <Box sx={{ pt: 2 }}>
                                        <Typography variant="h3">Item #1</Typography>
                                    </Box>
                                    <Box sx={{ pt: 2 }}>
                                        <Typography variant="h3">Item #2</Typography>
                                    </Box>
                                    <Box sx={{ pt: 2 }}>
                                        <Typography variant="h3">Item #3</Typography>
                                    </Box>
                                </MainCard>
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={6}>
                                <WishCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <LoginCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SamplePage;
